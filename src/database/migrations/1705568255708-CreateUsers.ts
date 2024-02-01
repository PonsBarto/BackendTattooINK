import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1705568255708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "surname",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "photo",
            type: "varchar",
            length: "500",
            default:
              "'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'",
          },
          {
            name: "username",
            type: "varchar",
            length: "255",
            isUnique: true,
          },

          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true,
          },
          {
            name: "password_hash",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
