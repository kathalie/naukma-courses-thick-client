export type CreateFeedbackDto = {
    rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    text?: string,
}

export type AllFeedbacksDto = {
    items: CreateFeedbackDto[],
    rating: number,
    ratingCount: number,
}