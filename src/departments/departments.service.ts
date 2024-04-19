import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import constants from 'src/common/constants';
import { Department } from './entities/department.entity';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import UpdateUserDto from 'src/user/dto/update-user.dto';
import { Test } from 'src/test/entities/test.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject(constants.DEPARTMENT_REPOSITORY)
    private departmentsRepository: typeof Department,
    private readonly usersService: UserService
  ) { }
  async create(createDepartmentsDto: CreateDepartmentDto): Promise<Department> {
    const newdepartment = await this.departmentsRepository.create({ ...createDepartmentsDto });

    const userRole = await this.usersService.defineUserRole({ user_id: createDepartmentsDto.hr_id, role_id: 3 }); //HR
    const user = await this.usersService.update(createDepartmentsDto.hr_id, { department_id: newdepartment.id } as UpdateUserDto);

    return newdepartment;
  }

  async findAll(): Promise<Department[]> {
    const departments = await this.departmentsRepository.findAll({ include: { all: true } });
    return departments;
  }

  async findOne(id: number): Promise<any> {
    const department = await this.departmentsRepository.findOne({ where: { id }, include: [{ model: User }, { model: Topic, include: [{ model: Test }] }] });
    const hr = await this.usersService.getDepartmentsHR(id);

    const dep = {
      hr: hr,
      department: {}
    }

    dep.department = department;
    return dep;
  }

  async update(id: number, updateDepartmentsDto: UpdateDepartmentDto): Promise<Department | [affectedCount: number]> {
    const department = await this.departmentsRepository.update({ ...updateDepartmentsDto }, { where: { id } });
    return department;
  }

  async remove(id: number): Promise<Department | number> {
    const department = await this.departmentsRepository.destroy({ where: { id } });
    return department;
  }
}
