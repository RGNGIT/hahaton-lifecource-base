import { Inject, Injectable } from '@nestjs/common';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import constants from 'src/common/constants';
import { Appeal } from './entities/appeal.entity';
import { HrAnswer } from 'src/hr_answer/entities/hr_answer.entity';

@Injectable()
export class AppealsService {
  constructor(
    @Inject(constants.APPEALS_REPOSITORY)
    private appealsRepository: typeof Appeal
  ) { }

  async create(createAppealDto: CreateAppealDto, user_id: number): Promise<Appeal> {
    const newAppeal = await this.appealsRepository.create({ user_id, ...createAppealDto });
    return newAppeal;
  }

  async findAll(): Promise<Appeal[]> {
    const appeal = await this.appealsRepository.findAll({ include: { all: true } });
    return appeal;
  }

  async findUserAppeal(user_id: number): Promise<Appeal[]> {
    const appeal = await this.appealsRepository.findAll({ where: { user_id }, include: { model: HrAnswer } });
    return appeal;
  }

  async findHRAppeal(hr_id: number): Promise<Appeal[]> {
    const appeal = await this.appealsRepository.findAll({ where: { hr_id }, include: { model: HrAnswer } });
    return appeal;
  }


  async findOne(id: number): Promise<Appeal> {
    const appeal = await this.appealsRepository.findOne({ where: { id }, include: { all: true } });
    return appeal;
  }

  async update(id: number, updateAppealDto: UpdateAppealDto): Promise<Appeal | [affectedCount: number]> {
    const appeal = await this.appealsRepository.update({ ...updateAppealDto }, { where: { id } })
    return appeal;
  }

  async remove(id: number): Promise<Appeal | number> {
    const appeal = await this.appealsRepository.destroy({ where: { id } });
    return appeal;
  }
}
