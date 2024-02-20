import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1706821384102 implements MigrationInterface {
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
            isNullable: true,
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
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
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