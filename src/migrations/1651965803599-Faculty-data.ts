import { MigrationInterface, QueryRunner } from 'typeorm';

export class FacultyData1651965803599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO edu_backend_courses.faculty (name,short_name) VALUES ('Факультет гуманітарних наук','ФГН');`
    );
    await queryRunner.query(
      `INSERT INTO edu_backend_courses.faculty (name,short_name) VALUES ('Факультет економічних наук','ФЕН');`
    );
    await queryRunner.query(
      `INSERT INTO edu_backend_courses.faculty (name,short_name) VALUES ('Факультет інформатики','ФІ');`
    );
    await queryRunner.query(
      `INSERT INTO edu_backend_courses.faculty (name,short_name) VALUES ('Факультет правничих наук','ФПвН');`
    );
    await queryRunner.query(
      `INSERT INTO edu_backend_courses.faculty (name,short_name) VALUES ('Факультет природничих наук','ФПрН');`
    );
    await queryRunner.query(
      `INSERT INTO edu_backend_courses.faculty (name,short_name) VALUES ('Факультет соціальних наук і соціальних технологій','ФСНСТ');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.warn(`Migration ${this.constructor.name} should not be reverted ...`);
  }
}
