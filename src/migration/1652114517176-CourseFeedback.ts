import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseFeedback1652114517176 implements MigrationInterface {
    name = 'CourseFeedback1652114517176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`course_feedback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`courseId\` int NOT NULL, \`rating\` tinyint NOT NULL, \`text\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`course_feedback\``);
    }

}
