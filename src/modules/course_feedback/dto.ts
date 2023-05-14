import {IsAlpha, IsInt, IsOptional, IsString, Max, Min} from "class-validator";

export class CreateFeedbackDto {
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @IsOptional()
    @IsString()
    text?: string;
}