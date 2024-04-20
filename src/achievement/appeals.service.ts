import { Inject, Injectable } from '@nestjs/common';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import constants from 'src/common/constants';
import { Appeal } from './entities/appeal.entity';
import { AppealStatus } from 'src/common/enums/appeal_status.enum';
import { Achievement } from './entities/achievement.entity';
import { Event } from 'src/event/entities/event.entity';
import { EventSection } from 'src/common/enums/event_section.enum';
import { User } from 'src/user/entities/user.entity';
import { University } from 'src/university/entities/university.entity';
import { Group } from 'src/university/entities/group.entity';

@Injectable()
export class AppealsService {
  constructor(
    @Inject(constants.APPEALS_REPOSITORY)
    private appealsRepository: typeof Appeal,

    @Inject(constants.ACHIEVEMENTS_REPOSITORY)
    private achievementRepository: typeof Achievement
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
    const appeal = await this.appealsRepository.findAll({ where: { user_id } });
    return appeal;
  }

  // async findHRAppeal(hr_id: number): Promise<Appeal[]> {
  //   const appeal = await this.appealsRepository.findAll({ where: { hr_id } });
  //   return appeal;
  // }


  async findOne(id: number): Promise<Appeal> {
    const appeal = await this.appealsRepository.findOne({ where: { id }, include: { all: true } });
    return appeal;
  }

  async update(id: number, updateAppealDto: UpdateAppealDto): Promise<Appeal | [affectedCount: number]> {
    const appeal = await this.appealsRepository.update({ ...updateAppealDto }, { where: { id } })
    
    switch(updateAppealDto.status)
    {
      case AppealStatus.accepted: {
        break;
      }
      case AppealStatus.declined: {
        break;
      }
    }
    return appeal;
  }

  async remove(id: number): Promise<Appeal | number> {
    const appeal = await this.appealsRepository.destroy({ where: { id } });
    return appeal;
  }

  async accept(id: number){
    const appeal = await Appeal.findByPk(id, {
      include: [{
          model: User,
          include: [{ model: Group }] // Загрузка данных факультета пользователя
      }, {
          model: Event,
          include: [{ model: University }] // Загрузка данных факультета события
      }]
    
    });
    if (!appeal) throw new Error('Заявка не найдена');

    const user = appeal.applicant;
    const event = appeal.event;

    const value = calculateAchievementValue(user, event);

    let achievement = await Achievement.findOne({
      where: { appeal_id: id },     
    });
    if (achievement) {
      achievement.value = value;
    } else {
      achievement = await Achievement.create({
        value,
        date: new Date(),
        user_id: user.id,
        appeal_id: appeal.id,
        event_id: event.id
      });
  }
    appeal.status = AppealStatus.accepted;
    await appeal.save();
    return achievement;
  }

  async decline(id: number){
    const appeal = await this.appealsRepository.update({ status: AppealStatus.declined }, { where: { id } });
    return "Заявка отклонена"
  }

}


function calculateAchievementValue(user: User, event: Event): number {
  // Здесь должна быть логика, которая определяет, профильное ли это достижение для студента
  var value = 2; // Базовое количество баллов

const values = [];
  const usergroups = user.groups
  user.groups.map((x) => {
    const code = x.direction.specialty_code;
    switch( event.section )
    {
      case EventSection.art:
        if(code.startsWith('1')) values.push(2);
        if(code.startsWith('2')) values.push(4);
        if(code.startsWith('3')) values.push(2);
        if(code.startsWith('4')) values.push(2);
        if(code.startsWith('5')) values.push(2);
        if(code.startsWith('6')) values.push(8);
        if(code.startsWith('7')) values.push(2);
        if(code.startsWith('8')) values.push(10);
        if(code.startsWith('9')) values.push(2);
        break;
      case EventSection.science:
        if(code.startsWith('1')) values.push(10);
        if(code.startsWith('2')) values.push(10);
        if(code.startsWith('3')) values.push(10);
        if(code.startsWith('4')) values.push(10);
        if(code.startsWith('5')) values.push(10);
        if(code.startsWith('6')) values.push(10);
        if(code.startsWith('7')) values.push(10);
        if(code.startsWith('8')) values.push(10);
        if(code.startsWith('9')) values.push(10);
        break;
      case EventSection.sport:
        if(code.startsWith('1')) values.push(2);
        if(code.startsWith('2')) values.push(2);
        if(code.startsWith('3')) values.push(4);
        if(code.startsWith('4')) values.push(2);
        if(code.startsWith('5')) values.push(2);
        if(code.startsWith('6')) values.push(2);
        if(code.startsWith('7')) values.push(2);
        if(code.startsWith('8')) values.push(6);
        if(code.startsWith('9')) values.push(10);
        break;
      case EventSection.volunteer:
        if(code.startsWith('1')) values.push(2);
        if(code.startsWith('2')) values.push(2);
        if(code.startsWith('3')) values.push(6);
        if(code.startsWith('4')) values.push(4);
        if(code.startsWith('5')) values.push(10);
        if(code.startsWith('6')) values.push(8);
        if(code.startsWith('7')) values.push(6);
        if(code.startsWith('8')) values.push(4);
        if(code.startsWith('9')) values.push(10);
        break;
      default:
        values.push(2);
    }
  })

  return Math.max(...values);;

}
