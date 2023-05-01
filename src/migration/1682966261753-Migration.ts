import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682966261753 implements MigrationInterface {
    name = 'Migration1682966261753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`text\` \`text\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`text\` \`text\` text NOT NULL`);
    }

}
