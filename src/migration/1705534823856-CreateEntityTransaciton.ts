import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntityTransaciton1705534823856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE "transactions" (
                "id" uuid PRIMARY KEY,
                "currency" character varying NOT NULL,
                "amount" numeric(10,2) NOT NULL,
                "userId" uuid REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
        `);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
