import {Module} from '@nestjs/common';
import {CourseModule} from './modules/course/course.module';
import {ScheduleModule} from './modules/schedule/schedule.module';
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports: [
        CourseModule,
        ScheduleModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 33080,
            username: 'root',
            password: 'root',
            database: 'node-js-task-03',
            entities: ['dist/**/*.entity.js'],
            charset: 'utf8mb4',
            logging: true
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
