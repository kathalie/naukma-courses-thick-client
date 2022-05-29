import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatingTables1653047096178 implements MigrationInterface {
  name = 'creatingTables1653047096178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."course_level_enum" AS ENUM('Bachelor', 'Master')`);
    await queryRunner.query(`CREATE TYPE "public"."course_seasons_enum" AS ENUM('Autumn', 'Spring', 'Summer')`);
    await queryRunner.query(
      `CREATE TABLE "course" ("code" integer NOT NULL, "name" character varying(100) NOT NULL, "description" text, "facultyName" character varying(50) NOT NULL, "departmentName" character varying(50) NOT NULL, "level" "public"."course_level_enum" NOT NULL, "year" smallint NOT NULL, "seasons" "public"."course_seasons_enum" array NOT NULL, "creditsAmount" real, "hoursAmount" real, "teacherName" character varying(50), CONSTRAINT "PK_5cf4963ae12285cda6432d5a3a4" PRIMARY KEY ("code"))`
    );
    await queryRunner.query(
      `CREATE TABLE "course_review" ("id" SERIAL NOT NULL, "course_id" integer NOT NULL, "rating" smallint NOT NULL, "text" text, CONSTRAINT "PK_6778f8a83352215ea3268869658" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course_review"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TYPE "public"."course_seasons_enum"`);
    await queryRunner.query(`DROP TYPE "public"."course_level_enum"`);
  }
}
