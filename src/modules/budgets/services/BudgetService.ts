import { injectable } from "tsyringe";
import { UserInputError } from "apollo-server-express";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import { sendEmail } from "@shared/util/mail";
import Budget from "@modules/budgets/entities/Budget";
import IBudgetDTO from "../dtos/IBudgetInput";
import { FormatSchemaErrors } from "@shared/helpers/errors";
import { IUpload, IFile } from "@shared/util/dtos";
import { processedFiles } from "@shared/helpers";

@injectable()
class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>
  ) {
    this.budgetRepository = budgetRepository;
  }

  public async list(): Promise<Budget[]> {
    const budgets = await this.budgetRepository.find();
    return budgets;
  }

  public async findById(id: string): Promise<Budget | undefined> {
    const budget = await this.budgetRepository.findOne({ id });

    if (!budget)
      throw new UserInputError(`No budgets found, related to id: ${id}"`);

    return budget;
  }

  public async create(
    data: IBudgetDTO,
    files?: [IUpload]
  ): Promise<Budget | undefined> {
    const budget = this.budgetRepository.create(data);
    await FormatSchemaErrors("budgetSchema", budget);
    let archives: IFile[] | undefined;

    if (files) {
      archives = await processedFiles(files, "Budget", budget);
    }

    /** send email */
    await sendEmail({
      subject: "Sistrel - Solicitação de Orçamento",
      template: 1,
      contact: {
        name: budget.name,
        email: budget.email,
        phoneNumber: budget.phoneNumber,
        mobileNumber: budget.mobileNumber
      },
      budget,
      files: archives,
      message: data.message
    });

    return this.budgetRepository.save(budget);
  }

  public deleteBudget = async (id: string): Promise<void> => {
    const budget = await this.findById(id);

    if (!budget)
      throw new UserInputError(`No budgets found, related to id: ${id}"`);

    const budgetDeleted = await this.budgetRepository.remove(budget);

    if (!budgetDeleted) {
      throw new Error(
        "It was not possible to delete the budget, budget the Administrator!"
      );
    }
  };
}

export default BudgetService;
