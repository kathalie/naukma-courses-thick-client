import {CreateFeedbackDto} from "./dto";

export type AllFeedbacks = {
    items: CreateFeedbackDto[],
    rating?: number,
    ratingCount: number,
}