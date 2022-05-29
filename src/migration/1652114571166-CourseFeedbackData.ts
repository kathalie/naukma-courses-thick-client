import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseFeedbackData1652114571166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO course_feedback(courseId, rating,text) VALUES (262582,3,null);');
    await queryRunner.query('INSERT INTO course_feedback(courseId, rating,text) VALUES (262582,6,\'test\');');
    await queryRunner.query('INSERT INTO course_feedback(courseId, rating,text) VALUES (262582,7,\'null\');');
    await queryRunner.query('INSERT INTO course_feedback(courseId, rating,text) VALUES (258178,3,\'test212\');');
    await queryRunner.query('INSERT INTO course_feedback(courseId, rating,text) VALUES (258178,1,null);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.warn(`Migration ${this.constructor.name} reverted...`);
  }
}
