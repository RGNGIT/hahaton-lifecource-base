import { Inject, Injectable } from '@nestjs/common';
import constants from 'src/common/constants';
import { Question } from '../entities/question.entity';
import UpdateQuestionDto from '../dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(constants.QUESTION_REPOSITORY)
    private questionRepository: typeof Question,
  ) { }

  async create(createQuestionDto) {
    const question = await this.questionRepository.create({ ...createQuestionDto });
    return question;
  }

  async findAll() {
    const question = await this.questionRepository.findAll({ include: { all: true } });
    return question;
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({ where: { id }, include: { all: true } });
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.update({ ...updateQuestionDto }, { where: { id } });
    return question;
  }

  async remove(id: number) {
    const question = await this.questionRepository.destroy({ where: { id } });
    return question;
  }
}