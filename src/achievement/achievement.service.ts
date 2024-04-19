import { Inject, Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './entities/achievement.entity';
import constants from 'src/common/constants';

@Injectable()
export class AchievementService {

  constructor(
    @Inject(constants.ACHIEVEMENTS_REPOSITORY)
    private achievementRepository: typeof Achievement
  ) { }

  async create(createAchievementDto: CreateAchievementDto) {
    const achievement = await this.achievementRepository.create({ ...createAchievementDto });
    return achievement;
  }

  async findAll(queryParams) {

    const { page, pageSize, ...filters } = queryParams;
    const offset = page * pageSize || 0;
    const limit = pageSize || 10;

    const where = {};
    Object.keys(filters).forEach(key => {
      where[key] = filters[key];
    });

    return this.achievementRepository.findAndCountAll({
      where,
      limit,
      offset,
    });
  }

  async findOne(id: number) {
    const achievement = await this.achievementRepository.findOne({ where: { id }, include: { all: true } });
    return achievement;
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {
    const achievement = await this.achievementRepository.update({ ...updateAchievementDto }, { where: { id } });
    return achievement;
  }

  async remove(id: number) {
    const achievement = await this.achievementRepository.destroy({ where: { id } });
    return achievement;
  }
}
