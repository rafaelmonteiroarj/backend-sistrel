import { injectable } from "tsyringe";
import { UserInputError } from "apollo-server-express";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import { sendEmail } from "@shared/util/mail";
import Contact from "@modules/contacts/entities/Contact";
import IContactDTO from "../dtos/IContactInput";
import { FormatSchemaErrors } from "@shared/helpers/errors";

@injectable()
class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>
  ) {
    this.contactRepository = contactRepository;
  }

  public async list(): Promise<Contact[]> {
    const contacts = await this.contactRepository.find();
    return contacts;
  }

  public async findById(id: string): Promise<Contact | undefined> {
    const contact = await this.contactRepository.findOne({ id });

    if (!contact)
      throw new UserInputError(`No contacts found, related to id: ${id}"`);

    return contact;
  }

  public async create(data: IContactDTO): Promise<Contact | undefined> {
    const contact = this.contactRepository.create(data);

    await FormatSchemaErrors("contactSchema", contact);

    /** send email */
    sendEmail({
      subject: "Sistrel - Solicitação de Contato",
      template: 0,
      contact,
      message: data.message
    });

    return this.contactRepository.save(contact);
  }

  public deleteContact = async (id: string): Promise<void> => {
    const contact = await this.findById(id);

    if (!contact)
      throw new UserInputError(`No contacts found, related to id: ${id}"`);

    const contactDeleted = await this.contactRepository.remove(contact);

    if (!contactDeleted) {
      throw new Error(
        "It was not possible to delete the contact, contact the Administrator!"
      );
    }
  };
}

export default ContactService;
