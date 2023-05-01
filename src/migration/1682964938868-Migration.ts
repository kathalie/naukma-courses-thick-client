import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682964938868 implements MigrationInterface {
    name = 'Migration1682964938868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` DROP FOREIGN KEY \`FK_af1de4d025accff2ab416c9a184\``);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`course\` \`courseCode\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`department_name\``);
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`department_name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` ADD CONSTRAINT \`FK_c17ac567990bbec0328b46d85bb\` FOREIGN KEY (\`courseCode\`) REFERENCES \`course\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` DROP FOREIGN KEY \`FK_c17ac567990bbec0328b46d85bb\``);
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`department_name\``);
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`department_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`courseCode\` \`course\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` ADD CONSTRAINT \`FK_af1de4d025accff2ab416c9a184\` FOREIGN KEY (\`course\`) REFERENCES \`course\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
