import { Injectable } from '@nestjs/common';
import { CourseFeedback } from '../../models/entity/CourseFeedback';
import { CourseFeedbackDto } from '../../models/dto/CourseFeedback.dto';

@Injectable()
export class CourseFeedbackService {
  public async findAllByCode(code: number): Promise<CourseFeedbackDto[]> {
    const res: CourseFeedback[] = await CourseFeedback.find({ where: { courseId: code } });
    res.forEach((x) => {
      resDto.push({
        rating: x.rating,
        text: x.text,
      });
    });
    const resDto: CourseFeedbackDto[] = res.map((x) => ({
      rating: x.rating,
      text: x.text,
    }));
    return resDto;
  }

  public async findRateAverageByCode(code: number): Promise<number> {
    const res = await this.findAllByCode(code);
    const rateSum = res.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
    return (rateSum / res.length);
  }

  async insert(code: number, dto: CourseFeedbackDto): Promise<CourseFeedback> {
    const entity: CourseFeedback = CourseFeedback.create();
    entity.courseId = code;
    entity.rating = dto.rating;
    entity.text = dto.text;
    await CourseFeedback.save(entity);
    return entity;
  }
}
