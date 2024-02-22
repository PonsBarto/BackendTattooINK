import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtists1706821388694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "artist",
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
            isPrimary: true,
          },
          {
            name: "portfolio",
            type: "varchar",
            length: "1255",
            default: "'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr5Sk93IcLJVNbpXcttBOI54RC7NqNuYjjFQ&usqp=CAU'", 
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("artist");
  }
}
