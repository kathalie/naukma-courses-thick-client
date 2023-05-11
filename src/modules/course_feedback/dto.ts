import {IsIn} from "class-validator";

export class CreateFeedbackDto {
    @IsIn(Array.from(
        {length: 10},
        (_, index) => index + 1
    ))
    rating: number;

    text?: string;
}