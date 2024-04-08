import {IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min} from "class-validator";
import {UserRole} from "../../common/types";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SaveUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    hash: string;
}