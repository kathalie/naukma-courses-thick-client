import { Injectable } from '@nestjs/common';
import {User} from "../../models/entities/User.entity";

@Injectable()
export class UserService {
    async findOne(email: string) {
        return User.findOneBy({email});
    }
}