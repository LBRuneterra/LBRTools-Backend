import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUsersRemoveEmailAddTag1613920735850 implements MigrationInterface {
    name = 'UpdateUsersRemoveEmailAddTag1613920735850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "email" TO "tag"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" TO "UQ_bdaf727e265d0bf8493b0fb4760"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."tag" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bdaf727e265d0bf8493b0fb4760"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_bdaf727e265d0bf8493b0fb4760" UNIQUE ("tag")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."tag" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_bdaf727e265d0bf8493b0fb4760" TO "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tag" TO "email"`);
    }

}
