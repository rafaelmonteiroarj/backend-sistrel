import { Query, Resolver, Arg, Mutation } from "type-graphql";

import ContactService from "@modules/contacts/services/ContactService";
import Contact from "../entities/Contact";
import { CreateContactInput } from "./types/create-contact.input";

@Resolver(Contact)
export default class ContactResolver {
  constructor(private readonly contactService: ContactService) {
    this.contactService = contactService;
  }

  @Query(() => [Contact])
  async contacts(): Promise<Contact[]> {
    return await this.contactService.list();
  }

  @Query(() => Contact)
  async contactById(@Arg("id") id: string): Promise<Contact | undefined> {
    return await this.contactService.findById(id);
  }

  @Mutation(() => Contact)
  async createContact(
    @Arg("data") data: CreateContactInput
  ): Promise<Contact | undefined> {
    return await this.contactService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteContact(@Arg("id") id: string): Promise<true> {
    await this.contactService.deleteContact(id);
    return true;
  }
}
