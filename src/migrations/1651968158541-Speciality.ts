import { MigrationInterface, QueryRunner } from 'typeorm';

export class Speciality1651968158541 implements MigrationInterface {
  name = 'Speciality1651968158541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`speciality\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`level\` enum ('Bachelor', 'Master') NOT NULL, \`faculty_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`speciality\` ADD CONSTRAINT \`FK_38643fef9b8b2c5082460858b1d\` FOREIGN KEY (\`faculty_id\`) REFERENCES \`faculty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`speciality\` DROP FOREIGN KEY \`FK_38643fef9b8b2c5082460858b1d\``);
    await queryRunner.query(`DROP TABLE \`speciality\``);
  }
}
