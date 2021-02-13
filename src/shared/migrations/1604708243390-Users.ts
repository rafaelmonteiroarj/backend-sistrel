import { MigrationInterface, QueryRunner, Table } from "typeorm";
export class Users1604708243390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true
          },
          {
            name: "password",
            type: "varchar",
            isUnique: true,
            isNullable: false
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
    await queryRunner.dropTable("users");
  }
}
