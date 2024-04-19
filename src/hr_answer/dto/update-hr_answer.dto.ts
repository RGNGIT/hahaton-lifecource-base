import { PartialType } from '@nestjs/swagger';
import { CreateHrAnswerDto } from './create-hr_answer.dto';

export class UpdateHrAnswerDto extends PartialType(CreateHrAnswerDto) { }
