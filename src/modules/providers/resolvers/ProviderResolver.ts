import { Query, Resolver, Arg, Mutation } from "type-graphql";

import ProviderService from "@modules/providers/services/ProviderService";
import Provider from "../entities/Provider";
import { CreateProviderInput } from "./types/create-provider.input";
import { IUpload } from "@shared/util/dtos";
import { GraphQLUpload } from "graphql-upload";

@Resolver(Provider)
export default class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {
    this.providerService = providerService;
  }

  @Query(() => [Provider])
  async provders(): Promise<Provider[]> {
    return await this.providerService.list();
  }

  @Query(() => Provider)
  async providerById(@Arg("id") id: string): Promise<Provider | undefined> {
    return await this.providerService.findById(id);
  }

  @Mutation(() => Provider)
  async createProvider(
    @Arg("data") data: CreateProviderInput,
    @Arg("files", () => [GraphQLUpload], { nullable: true }) files: [IUpload]
  ): Promise<Provider | undefined> {
    return await this.providerService.create(data, files);
  }

  @Mutation(() => Boolean)
  async deleteProvider(@Arg("id") id: string): Promise<true> {
    await this.providerService.deleteProvider(id);
    return true;
  }
}
