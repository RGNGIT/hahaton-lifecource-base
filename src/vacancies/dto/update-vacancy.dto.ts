import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVacancyDto } from './create-vacancy.dto';

export class UpdateVacancyDto extends PartialType(CreateVacancyDto) {
  @ApiProperty()
  subscriber_id: number;
}