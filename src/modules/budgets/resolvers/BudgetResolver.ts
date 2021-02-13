import { Query, Resolver, Arg, Mutation } from "type-graphql";

import BudgetService from "@modules/budgets/services/BudgetService";
import Budget from "../entities/Budget";
import { CreateBudgetInput } from "./types/create-budget.input";
import { IUpload } from "@shared/util/dtos";
import { GraphQLUpload } from "graphql-upload";

@Resolver(Budget)
export default class BudgetResolver {
  constructor(private readonly budgetService: BudgetService) {
    this.budgetService = budgetService;
  }

  @Query(() => [Budget])
  async budgets(): Promise<Budget[]> {
    return await this.budgetService.list();
  }

  @Query(() => Budget)
  async budgetById(@Arg("id") id: string): Promise<Budget | undefined> {
    return await this.budgetService.findById(id);
  }

  @Mutation(() => Budget)
  async createBudget(
    @Arg("data") data: CreateBudgetInput,
    @Arg("files", () => [GraphQLUpload], { nullable: true }) files: [IUpload]
  ): Promise<Budget | undefined> {
    return await this.budgetService.create(data, files);
  }

  @Mutation(() => Boolean)
  async deleteBudget(@Arg("id") id: string): Promise<true> {
    await this.budgetService.deleteBudget(id);
    return true;
  }
}
