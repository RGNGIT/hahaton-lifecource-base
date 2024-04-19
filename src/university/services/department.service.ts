import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department.entity';
import constants from 'src/common/constants';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(constants.DEPARTMENT_REPOSITORY)
    private departmentsRepository: typeof Department
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentsRepository.create({ ...createDepartmentDto });
    return department;
  }

  async findAll() {
    const department = await this.departmentsRepository.findAll({ include: { all: true } });
    return department;
  }

  async findOne(id: number) {
    const department = await this.departmentsRepository.findOne({ where: { id }, include: { all: true } });
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentsRepository.update({ ...updateDepartmentDto }, { where: { id } });
    return department;
  }

  async remove(id: number) {
    const department = await this.departmentsRepository.destroy({ where: { id } });
    return department;
  }
}
