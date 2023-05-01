import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682965175302 implements MigrationInterface {
    name = 'Migration1682965175302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`department_name\``);
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`department_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`department_name\``);
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`department_name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
