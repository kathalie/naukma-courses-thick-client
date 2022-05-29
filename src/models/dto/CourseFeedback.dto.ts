import {
  IsOptional, IsString, Max, Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseFeedbackDto {
  @ApiProperty()
  @Min(1)
  @Max(10)
  readonly rating: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly text?: string;
}
