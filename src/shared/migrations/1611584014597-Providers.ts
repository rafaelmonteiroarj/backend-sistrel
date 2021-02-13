import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Providers1611584014597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.createTable(
      new Table({
        name: "providers",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid"
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "phone_number",
            type: "varchar",
            isNullable: false
          },
          {
            name: "mobile_number",
            type: "varchar",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            isUnique: false,
            isNullable: false
          },
          {
            name: "company_name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "company_phone_number",
            type: "varchar",
            isNullable: false
          },
          {
            name: "company_cnpj",
            type: "varchar",
            isNullable: false
          },
          {
            name: "type_of_service",
            type: "varchar",
            isNullable: false
          },
          {
            name: "message",
            type: "text",
            isNullable: true
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("providers");
  }
}
