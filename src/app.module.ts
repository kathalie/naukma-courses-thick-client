import {Module} from '@nestjs/common';
import {CourseModule} from './modules/course/course.module';
import {ScheduleModule} from './modules/schedule/schedule.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppDataSource} from "./data-source";
import {CourseFeedbackModule} from "./modules/course_feedback/course_feedback.module";

@Module({
    imports: [
        CourseModule,
        ScheduleModule,
        CourseFeedbackModule,
        TypeOrmModule.forRoot(AppDataSource.options),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
