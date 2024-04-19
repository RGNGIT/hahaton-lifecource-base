import { PartialType } from '@nestjs/mapped-types';
import CreateAnswerDto from './create-answer.dto';

export default class UpdateAnswerDto extends PartialType(CreateAnswerDto) { }