import { Inject, Injectable } from '@nestjs/common';
import { CreateDirectionDto } from '../dto/create-direction.dto';
import { UpdateDirectionDto } from '../dto/update-direction.dto';
import constants from 'src/common/constants';
import { Direction } from '../entities/direction.entity';

@Injectable()
export class DirectionService {

  constructor(
    @Inject(constants.DIRECTION_REPOSITORY)
    private directionsRepository: typeof Direction
  ) { }

  async create(createDirectionDto: CreateDirectionDto) {
    const direction = await this.directionsRepository.create({ ...createDirectionDto });
    return direction;
  }

  async findAll() {
    const directions = await this.directionsRepository.findAll({ include: { all: true } });
    return directions;
  }

  async findOne(id: number) {
    const direction = await this.directionsRepository.findOne({ where: { id }, include: { all: true } });
    return direction;
  }


  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    const direction = await this.directionsRepository.update({ ...updateDirectionDto }, { where: { id } });
    return direction;
  }

  async remove(id: number) {
    const direction = await this.directionsRepository.destroy({ where: { id } });
    return direction;
  }
}
