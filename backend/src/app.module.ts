import 'reflect-metadata';

import {Module} from '@nestjs/common';
import {CourseModule} from './modules/course/course.module';
import {ScheduleModule} from './modules/schedule/schedule.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppDataSource} from "./data-source";
import {CourseFeedbackModule} from "./modules/course_feedback/course_feedback.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./common/roles/roles.guard";

@Module({
    imports: [
        CourseModule,
        ScheduleModule,
        CourseFeedbackModule,
        AuthModule,
        UserModule,
        TypeOrmModule.forRoot(AppDataSource.options),
        UserModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {
}
