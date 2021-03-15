import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTeamsDayRegister1615842080390 implements MigrationInterface {
    name = 'CreateTeamsDayRegister1615842080390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams_day_register" ("id" SERIAL NOT NULL, "responsible" character varying NOT NULL, "registerTime" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "team_id" integer, CONSTRAINT "PK_0c6ea71aeaccc1d5bffce86936f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "teams_day_register" ADD CONSTRAINT "FK_0ccb1f4db2dcf69a86cd2770da0" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams_day_register" DROP CONSTRAINT "FK_0ccb1f4db2dcf69a86cd2770da0"`);
        await queryRunner.query(`DROP TABLE "teams_day_register"`);
    }

}
