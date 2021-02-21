import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDecks1613935204343 implements MigrationInterface {
    name = 'CreateDecks1613935204343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" ADD "tag" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "decks" ADD "decks" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" DROP COLUMN "decks"`);
        await queryRunner.query(`ALTER TABLE "decks" DROP COLUMN "tag"`);
    }

}
