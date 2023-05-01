import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682955529371 implements MigrationInterface {
    name = 'Migration1682955529371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`course_feedback\` (\`feedback_id\` int NOT NULL AUTO_INCREMENT, \`code\` int NOT NULL, \`rating\` tinyint NOT NULL, \`text\` text NOT NULL, PRIMARY KEY (\`feedback_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course\` (\`code\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`faculty_name\` varchar(255) NOT NULL, \`department_name\` varchar(255) NOT NULL, \`level\` enum ('Bachelor', 'Master') NOT NULL, \`year\` int NOT NULL, \`seasons\` set ('Autumn', 'Spring', 'Summer') NOT NULL, \`credits_amount\` int NOT NULL, \`hours_amount\` int NOT NULL, \`teacher_name\` varchar(255) NOT NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`course_feedback\` ADD CONSTRAINT \`FK_1b4528beacb5138a5bbc86a420f\` FOREIGN KEY (\`code\`) REFERENCES \`course\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_feedback\` DROP FOREIGN KEY \`FK_1b4528beacb5138a5bbc86a420f\``);
        await queryRunner.query(`DROP TABLE \`course\``);
        await queryRunner.query(`DROP TABLE \`course_feedback\``);
    }

}
