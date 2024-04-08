import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: JwtService) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findOne(email);

        if (!user) {
            throw new NotFoundException("User was not found");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashesMatch = await bcrypt.compare(user.hash, hashedPassword);

        if (!hashesMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}