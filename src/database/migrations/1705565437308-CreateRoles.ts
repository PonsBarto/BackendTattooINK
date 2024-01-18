import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoles1705565437308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "roles",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "role_name",
                     type: "varchar",
                     length: "50",
                     isUnique: true,
                  },
               ],
            }),
            true
        );    

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
    }

}
