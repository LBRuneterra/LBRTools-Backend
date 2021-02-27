import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDecks1614388646880 implements MigrationInterface {
    name = 'CreateDecks1614388646880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "decks" ("id" SERIAL NOT NULL, "decks" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "decks" ADD CONSTRAINT "FK_329af7716096378c8e13125edd5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "decks" DROP CONSTRAINT "FK_329af7716096378c8e13125edd5"`);
        await queryRunner.query(`DROP TABLE "decks"`);
    }

}
