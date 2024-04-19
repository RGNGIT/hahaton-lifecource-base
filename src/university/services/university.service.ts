import { Inject, Injectable } from '@nestjs/common';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import constants from 'src/common/constants';
import { University } from '../entities/university.entity';

@Injectable()
export class UniversityService {
  constructor(
    @Inject(constants.UNIVERSITY_REPOSITORY)
    private universitiesRepository: typeof University
  ) { }

  async create(createUniversityDto: CreateUniversityDto) {
    const university = await this.universitiesRepository.create({ ...createUniversityDto });
    return university;
  }

  async findAll() {
    const universities = await this.universitiesRepository.findAll({ include: { all: true } });
    return universities;
  }

  async findOne(id: number) {
    const university = await this.universitiesRepository.findOne({ where: { id }, include: { all: true } });
    return university;
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto) {
    const university = await this.universitiesRepository.update({ ...updateUniversityDto }, { where: { id } });
    return university;
  }

  async remove(id: number) {
    const university = await this.universitiesRepository.destroy({ where: { id } });
    return university;
  }

}
