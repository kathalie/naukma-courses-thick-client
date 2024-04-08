import { Injectable } from '@nestjs/common';
import {User} from "../../models/entities/User.entity";
import {CreateUserDto, SaveUserDto} from "./dto";
import {CourseFeedback} from "../../models/entities/CourseFeedback.entity";
import {CourseService} from "../course/course.service";
import {UserRole} from "../../common/types";

@Injectable()
export class UserService {
    async findOne(email: string) {
        return User.findOneBy({email});
    }

    async createUser(saveUserDto: SaveUserDto) {
        let user = {
            ...saveUserDto,
            roles: [UserRole.USER]
        } as User;

        return await User.save(user);
    }
}