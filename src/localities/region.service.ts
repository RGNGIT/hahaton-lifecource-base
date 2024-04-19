import { Inject, Injectable } from '@nestjs/common';
import constants from 'src/common/constants';
import { Region } from './entities/region.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @Inject(constants.REGION_REPOSITORY)
    private regionsRepository: typeof Region
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionsRepository.create({ ...createRegionDto });
    return newRegion;
  }

  async findAll() {
    const regions = await this.regionsRepository.findAll({ include: { all: true } });
    return regions;
  }

  async findOne(id: number) {
    const regions = await this.regionsRepository.findOne({ where: { id }, include: { all: true } });
    return regions;
  }


  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionsRepository.update({ ...updateRegionDto }, { where: { id } });
    return region;
  }

  async remove(id: number) {
    const region = await this.regionsRepository.destroy({ where: { id } });
    return region;
  }
}
