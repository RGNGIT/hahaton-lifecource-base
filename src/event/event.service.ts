import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import constants from 'src/common/constants';
// import { Participants } from './entities/participants.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject(constants.EVENT_REPOSITORY)
    private eventsRepository: typeof Event,
    // @Inject(constants.PARTICIPANTS_REPOSITORY)
    // private participantsRepository: typeof Participants,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const event = await this.eventsRepository.create({ ...createEventDto });
    return event;
  }

  async findAll() {
    const events = await this.eventsRepository.findAll({ include: { all: true } });
    return events;
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne({ where: { id }, include: { all: true } });
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.update({ ...updateEventDto }, { where: { id } });
    return event;
  }

  async remove(id: number) {
    const event = await this.eventsRepository.destroy({ where: { id } });
    return event;
  }

  // async addParticipant(user_id: number, event_id: number){
  //   const event = await this.eventsRepository.findByPk(event_id);
  //   if (!event) {
  //     throw new NotFoundException('Мероприятие не найдено');
  //   }

  //   const existingParticipant = await this.participantsRepository.findOne({
  //     where: { event_id, user_id }
  //   });

  //   if(existingParticipant){
  //     throw new Error('Вы уже участник данного мероприятия');
  //   }

  //   const participant = new this.participantsRepository({
  //     event_id,
  //     user_id
  //   });
  //   return participant.save();


  // }
}
