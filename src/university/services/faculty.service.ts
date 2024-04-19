import { Inject, Injectable } from '@nestjs/common';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';
import constants from 'src/common/constants';
import { Faculty } from '../entities/faculty.entity';

@Injectable()
export class FacultyService {
  constructor(
    @Inject(constants.FACULTY_REPOSITORY)
    private facultiesRepository: typeof Faculty
  ) { }

  async create(createFacultyDto: CreateFacultyDto) {
    const newRegion = await this.facultiesRepository.create({ ...createFacultyDto });
    return newRegion;
  }

  async findAll() {
    const regions = await this.facultiesRepository.findAll({ include: { all: true } });
    return regions;
  }

  async findOne(id: number) {
    const regions = await this.facultiesRepository.findOne({ where: { id }, include: { all: true } });
    return regions;
  }


  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const region = await this.facultiesRepository.update({ ...updateFacultyDto }, { where: { id } });
    return region;
  }

  async remove(id: number) {
    const region = await this.facultiesRepository.destroy({ where: { id } });
    return region;
  }
}
