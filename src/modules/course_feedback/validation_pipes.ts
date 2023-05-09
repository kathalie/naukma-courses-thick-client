import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {CreateFeedbackDto} from "./dto";

@Injectable()
export class FeedbackBodyValidationPipe implements PipeTransform {
    transform(value: CreateFeedbackDto) {
        const rating = value.rating;

        // @ts-ignore
        if (!rating && rating != 0)
            throw new BadRequestException('Rating is required');
        // if (!/\d+/.test(rating.toString()))
        //     throw new BadRequestException('Rating should be a whole number');
        if (rating < 1 || rating > 10)
            throw new BadRequestException('Rating should be in range from 1 to 10');

        return value;
    }
}
