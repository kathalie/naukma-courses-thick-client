import {
    Body, ConflictException,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException, NotFoundException,
    Post,
    Request, UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto";
import {CreateUserDto} from "../user/dto";
import {AxiosError} from "axios";
import {CourseNotFoundException, DisconnectedException} from "../../common/exceptions";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        try {
            return this.authService.signIn(loginDto.email, loginDto.password);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new NotFoundException();
            if ((err as AxiosError).response?.status === HttpStatus.UNAUTHORIZED) throw new UnauthorizedException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        try {
            return this.authService.signUp(createUserDto);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.CONFLICT) throw new ConflictException();
            if ((err as AxiosError).response?.status === HttpStatus.UNAUTHORIZED) throw new UnauthorizedException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}
