import { Inject, Injectable } from '@nestjs/common';
import { CreateHrAnswerDto } from './dto/create-hr_answer.dto';
import { UpdateHrAnswerDto } from './dto/update-hr_answer.dto';
import constants from 'src/common/constants';
import { HrAnswer } from './entities/hr_answer.entity';
import { Appeal } from 'src/achievement/entities/appeal.entity';

@Injectable()
export class HrAnswerService {
  constructor(
    @Inject(constants.HRANSWERS_REPOSITORY)
    private hrAnswerRepository: typeof HrAnswer
  ) { }

  async create(createhr_answersDto: CreateHrAnswerDto): Promise<HrAnswer> {
    const newhr_answer = await this.hrAnswerRepository.create({ ...createhr_answersDto });
    return newhr_answer;
  }

  async findAll(): Promise<HrAnswer[]> {
    const hr_answers = await this.hrAnswerRepository.findAll({ include: { model: Appeal } });
    return hr_answers;
  }

  async findAppealAnswers(appeal_id: number): Promise<HrAnswer[]> {
    const hr_answers = await this.hrAnswerRepository.findAll({ where: { appeal_id } });
    return hr_answers;
  }

  async findOne(id: number): Promise<HrAnswer> {
    const hr_answer = await this.hrAnswerRepository.findOne({ where: { id }, include: { model: Appeal } });
    return hr_answer;
  }

  async update(id: number, updatehr_answersDto: UpdateHrAnswerDto): Promise<HrAnswer | [affectedCount: number]> {
    const hr_answer = await this.hrAnswerRepository.update({ ...updatehr_answersDto }, { where: { id } });
    return hr_answer;
  }

  async remove(id: number): Promise<HrAnswer | number> {
    const hr_answer = await this.hrAnswerRepository.destroy({ where: { id } });
    return hr_answer;
  }
}
