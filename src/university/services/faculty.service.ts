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
    const faculty = await this.facultiesRepository.create({ ...createFacultyDto });
    return faculty;
  }

  async findAll() {
    const faculties = await this.facultiesRepository.findAll({ include: { all: true } });
    return faculties;
  }

  async findOne(id: number) {
    const faculty = await this.facultiesRepository.findOne({ where: { id }, include: { all: true } });
    return faculty;
  }


  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const faculty = await this.facultiesRepository.update({ ...updateFacultyDto }, { where: { id } });
    return faculty;
  }

  async remove(id: number) {
    const faculty = await this.facultiesRepository.destroy({ where: { id } });
    return faculty;
  }
}
