import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682961245639 implements MigrationInterface {
    name = 'Migration1682961245639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` DROP FOREIGN KEY \`FK_1b4528beacb5138a5bbc86a420f\``);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`code\` \`course\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`course\` \`course\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` ADD CONSTRAINT \`FK_af1de4d025accff2ab416c9a184\` FOREIGN KEY (\`course\`) REFERENCES \`course\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` DROP FOREIGN KEY \`FK_af1de4d025accff2ab416c9a184\``);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`course\` \`course\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` CHANGE \`course\` \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` ADD CONSTRAINT \`FK_1b4528beacb5138a5bbc86a420f\` FOREIGN KEY (\`code\`) REFERENCES \`course\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
