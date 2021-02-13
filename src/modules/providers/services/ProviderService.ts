import { injectable } from "tsyringe";
import { UserInputError } from "apollo-server-express";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import { sendEmail } from "@shared/util/mail";
import Provider from "@modules/providers/entities/Provider";
import IProviderDTO from "../dtos/IProviderInput";
import { FormatSchemaErrors } from "@shared/helpers/errors";
import { IUpload, IFile } from "@shared/util/dtos";
import { processedFiles } from "@shared/helpers";

@injectable()
class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ) {
    this.providerRepository = providerRepository;
  }

  public async list(): Promise<Provider[]> {
    const providers = await this.providerRepository.find();
    return providers;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.providerRepository.findOne({ id });

    if (!provider)
      throw new UserInputError(`No providers found, related to id: ${id}"`);

    return provider;
  }

  public async create(
    data: IProviderDTO,
    files?: [IUpload]
  ): Promise<Provider | undefined> {
    const provider = this.providerRepository.create(data);
    await FormatSchemaErrors("providerSchema", provider);
    let archives: IFile[] | undefined;

    if (files) {
      archives = await processedFiles(files, "Provider", provider);
    }

    /** send email */
    await sendEmail({
      subject: "Sistrel - Quero ser Fornecedor",
      template: 2,
      contact: {
        name: provider.name,
        email: provider.email,
        phoneNumber: provider.phoneNumber,
        mobileNumber: provider.mobileNumber
      },
      provider,
      files: archives,
      message: data.message
    });

    return this.providerRepository.save(provider);
  }

  public deleteProvider = async (id: string): Promise<void> => {
    const provider = await this.findById(id);

    if (!provider)
      throw new UserInputError(`No providers found, related to id: ${id}"`);

    const providerDeleted = await this.providerRepository.remove(provider);

    if (!providerDeleted) {
      throw new Error(
        "It was not possible to delete the provider, provider the Administrator!"
      );
    }
  };
}

export default ProviderService;
