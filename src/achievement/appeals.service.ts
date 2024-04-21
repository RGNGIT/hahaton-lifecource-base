import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import sequelize from 'sequelize';
import { Direction } from 'src/university/entities/direction.entity';

@Injectable()
export class AppealsService {
  constructor(
    @Inject(constants.APPEALS_REPOSITORY)
    private appealsRepository: typeof Appeal,

    @Inject(constants.ACHIEVEMENTS_REPOSITORY)
    private achievementRepository: typeof Achievement,

    @Inject(constants.USERS_REPOSITORY)
    private usersRepository: typeof User,
  ) { }

  async create(createAppealDto: CreateAppealDto, user_id: number): Promise<Appeal> {

    console.log(createAppealDto, user_id);
    const existAppeal = await this.appealsRepository.findOne({where: {user_id: user_id, event_id: createAppealDto.event_id}});
    console.log(existAppeal);

    if(existAppeal){
      throw new HttpException("Вы уже подали заявку на достижение по данному мероприятию", HttpStatus.BAD_REQUEST);
    }

    const newAppeal = await this.appealsRepository.create({ user_id: user_id, ...createAppealDto });
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

    const appeal = await this.appealsRepository.findByPk(id, {
      include: [{
          model: User,
          include: [{ model: Group, include: [{model: Direction}] }] // Загрузка данных факультета пользователя
      }, {
          model: Event,
          include: [{ model: University }] // Загрузка данных факультета события
      }]
    
    });
    if (!appeal) throw new HttpException('Заявка не найдена', HttpStatus.BAD_REQUEST);

    if(appeal.status != AppealStatus.new) throw new HttpException('Заявка уже обработана', HttpStatus.BAD_REQUEST);
    const user = appeal.user;
    const event = appeal.event;

    const value = calculateAchievementValue(user, event);

    let achievement = await this.achievementRepository.findOne({
      where: { appeal_id: id },     
    });
    if (achievement) {
      await this.achievementRepository.update({ value }, { where: { id: achievement.id } });

    } else {
      achievement = await this.achievementRepository.create({
        value,
        user_id: user.id,
        appeal_id: appeal.id,
        event_id: event.id
      });
    }

    await this.appealsRepository.update({ status: AppealStatus.accepted }, { where: { id } });

    await this.usersRepository.update({  rating: sequelize.literal('rating + ' + value) }, { where: { id: user.id } });

    return achievement;
  }

  async decline(id: number){

    const existAppeal = await this.appealsRepository.findByPk(id);
    if (!existAppeal) throw new HttpException('Заявка не найдена', HttpStatus.BAD_REQUEST);

    if(existAppeal.status != AppealStatus.new) throw new HttpException('Заявка уже обработана', HttpStatus.BAD_REQUEST);
    await this.appealsRepository.update({ status: AppealStatus.declined }, { where: { id } });
    return "Заявка отклонена"
  }

}


function calculateAchievementValue(user: User, event: Event): number {
const values = [2];

  const usergroups = user.groups;
  if(usergroups == null) {
    throw new HttpException("Студент не состоит ни в одной группе",HttpStatus.BAD_REQUEST)
  }
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
