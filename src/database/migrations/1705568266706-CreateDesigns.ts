import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDesigns1705568266706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "designs",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "artist_id",
                  type: "int",
                  isUnique: true,
                },
                {
                  name: "name",
                  type: "varchar",
                  length: "50",
                },
                {
                  name: "image",
                  type: "varchar",
                  length: "50",
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["artist_id"],
                  referencedTableName: "artists",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE",
                },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("designs");
    }

}
