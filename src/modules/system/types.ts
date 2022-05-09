import { ApiProperty } from '@nestjs/swagger';

export class SystemDebugDTO {
  @ApiProperty({
    title: 'ID сутності',
    required: true,
    default: 123,
    type: Number,
  })
  public id: number;

  @ApiProperty({
    title: 'Назва сутності',
    required: true,
    default: 'Назва',
    type: String,
  })
  public name: string;

  @ApiProperty({
    title: 'ID дітей',
    required: true,
    type: Number,
    isArray: true,
    default: [456, 789],
  })
  public children: number[];

  @ApiProperty({
    title: 'ID батька',
    required: false,
  })
  public parent?: number;
}
