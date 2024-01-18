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
                  name: "role",
                  type: "int",
                },
                {
                  name: "username",
                  type: "varchar",
                  length: "50",
                },
                {
                  name: "password_hash",
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
              foreignKeys: [
                {
                  columnNames: ["role"],
                  referencedTableName: "roles",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
