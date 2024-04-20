import { Inject, Injectable } from '@nestjs/common';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import constants from 'src/common/constants';
import { University } from '../entities/university.entity';
import { Admins } from '../entities/admins.entity';
import { Faculty } from '../entities/faculty.entity';
import { Department } from '../entities/department.entity';
import { Direction } from '../entities/direction.entity';
import { Group } from '../entities/group.entity';

@Injectable()
export class UniversityService {
  constructor(
    @Inject(constants.UNIVERSITY_REPOSITORY)
    private universitiesRepository: typeof University,
    @Inject(constants.ADMINS_REPOSITORY)
    private adminsRepository: typeof Admins
    // private readonly usersService: UserService
  ) { }


  // async create(createDepartmentsDto: CreateDepartmentDto): Promise<Department> {
  //   const newdepartment = await this.departmentsRepository.create({ ...createDepartmentsDto });

  //   const userRole = await this.usersService.defineUserRole({ user_id: createDepartmentsDto.hr_id, role_id: 3 }); //HR
  //   const user = await this.usersService.update(createDepartmentsDto.hr_id, { department_id: newdepartment.id } as UpdateUserDto);

  //   return newdepartment;
  // }

  async create(createUniversityDto: CreateUniversityDto) {
    const university = await this.universitiesRepository.create({ ...createUniversityDto });
    return university;
  }

  async findAll() {
    const universities = await this.universitiesRepository.findAll({ include: { all: true } });
    return universities;
  }

  // async findAll(queryParams) {

  //   const { page, pageSize, ...filters } = queryParams;
  //   const offset = page * pageSize || 0;
  //   const limit = pageSize || 10;

  //   const where = {};
  //   Object.keys(filters).forEach(key => {
  //     where[key] = filters[key];
  //   });

  //   return this.universitiesRepository.findAndCountAll({
  //     where,
  //     limit,
  //     offset,
  //   });
  // }

  async findOne(id: number) {
    const university = await this.universitiesRepository.findOne({ where: { id }, include: { model: Faculty, include: [{ model: Department, include: [{ model: Direction, include: [{ model: Group }] }] }] } });
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

  async addAdmin(id: number, admin_id: number) {
    const admin = await this.adminsRepository.create({ university_id: id, user_id: admin_id });
    return admin;
  }

}
