import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CourseReviewDTO {
  @ApiProperty({
    title: 'Grade',
    required: true,
    type: 'Number',
  })
  @IsInt()
  @Min(1, {
    message: 'Grade must be in a range of [1,10]',
  })
  @Max(10, {
    message: 'Grade must be in a range of [1,10]',
  })
  public rating = 0;

  @ApiProperty({
    title: 'Feedback text',

    required: false,
    type: 'String',
  })
  @IsString()
  @IsOptional()
  public text?: string;
}
