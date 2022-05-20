import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CourseReviewDTO {
	@IsInt()
	@Min(1, {
		message: "Grade must be in a range of [1,10]"
	})
	@Max(10, {
		message: "Grade must be in a range of [1,10]"
	})
	public rating: number = 0;

	@IsString()
	@IsOptional()
	public text?: string;
}