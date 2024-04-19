import { Inject, Injectable } from '@nestjs/common';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import constants from 'src/common/constants';
import { Locality } from './entities/locality.entity';

@Injectable()
export class LocalityService {
  constructor(
    @Inject(constants.LOCALITY_REPOSITORY)
    private localitiesRepository: typeof Locality
  ) { }

  async create(createLocalityDto: CreateLocalityDto) {
    const newLocality = await this.localitiesRepository.create({ ...createLocalityDto });
    return newLocality;
  }

  async findAll() {
    const localities = await this.localitiesRepository.findAll({ include: { all: true } });
    return localities;
  }

  async findOne(id: number) {
    const localities = await this.localitiesRepository.findOne({ where: { id }, include: { all: true } });
    return localities;
  }


  async update(id: number, updateLocalityDto: UpdateLocalityDto) {
    const locality = await this.localitiesRepository.update({ ...updateLocalityDto }, { where: { id } });
    return locality;
  }

  async remove(id: number) {
    const locality = await this.localitiesRepository.destroy({ where: { id } });
    return locality;
  }
}
