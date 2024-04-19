import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import constants from 'src/common/constants';

@Injectable()
export class EventService {
  constructor(
    @Inject(constants.EVENT_REPOSITORY)
    private eventsRepository: typeof Event
  ) { }

  async create(createEventDto: CreateEventDto) {
    const event = await this.eventsRepository.create({ ...createEventDto });
    return event;
  }

  async findAll() {
    const event = await this.eventsRepository.findAll({ include: { all: true } });
    return event;
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
}
