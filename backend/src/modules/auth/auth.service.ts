import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto, SaveUserDto} from "../user/dto";


@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: JwtService) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findOne(email);

        if (!user) {
            throw new NotFoundException("User was not found");
        }

        const hashedPassword = await this.getHash(password);
        const hashesMatch = await bcrypt.compare(user.hash, hashedPassword);

        if (!hashesMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const user = await this.usersService.findOne(createUserDto.email);

        if (user) {
            throw new ConflictException("User already exists");
        }

        const hashedPassword = await this.getHash(createUserDto.password);

        return await this.usersService.createUser({
            email: createUserDto.email,
            name: createUserDto.name,
            hash: hashedPassword
        } as SaveUserDto);
    }

    private async getHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(password, salt);
    }
}