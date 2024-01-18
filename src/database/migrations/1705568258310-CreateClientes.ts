import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientes1705568258310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "clients",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "user_id",
                  type: "int",
                  isUnique: true,
                },
                {
                  name: "first_name",
                  type: "varchar",
                  length: "50",
                },
                {
                  name: "last_name",
                  type: "varchar",
                  length: "50",
                  isNullable: true,
                },
                {
                  name: "phone_number",
                  type: "varchar",
                  length: "50",
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clients");
    }

}
