import { Inject, Injectable } from '@nestjs/common';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import constants from 'src/common/constants';
import { University } from '../entities/university.entity';
import { Admins } from '../entities/admins.entity';
import { Students } from '../entities/students.entity';
import { Group } from '../entities/group.entity';
import { Direction } from '../entities/direction.entity';
import { Department } from '../entities/department.entity';
import { Faculty } from '../entities/faculty.entity';
import { User } from 'src/user/entities/user.entity';
import { dbProviders } from 'src/sequelize/providers/database.providers';
import { UserContent } from 'src/user-content/entities/user-content-unit.entity';

@Injectable()
export class UniversityService {
  constructor(
    @Inject(constants.UNIVERSITY_REPOSITORY)
    private universitiesRepository: typeof University,
    @Inject(constants.ADMINS_REPOSITORY)
    private adminsRepository: typeof Admins,
    @Inject(constants.USERS_REPOSITORY)
    private usersRepository: typeof User,
    @Inject(constants.USER_CONTENT_REPOSITORY)
    private userContent: typeof UserContent
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
    const university = await this.universitiesRepository.findOne({ where: { id }, include: [{ model: Faculty, include: [{ model: Department, include: [{ model: Direction, include: [{ model: Group }] }] }] }, { model: User }] });
    return university;
  }

  async findByAdmin(id: number) {
    const universities = await this.universitiesRepository.findAll({ include: [{ model: User, where: { id } }] });
    return universities;
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

  async getUniversityStudentsCount(id: number) {
    const students = await (await dbProviders[0].useFactory()).query(
      `SELECT COUNT(*) 
      as n FROM students a, \`groups\` b, directions c, departments d, faculties e, universities f 
      WHERE a.group_id = b.id AND b.direction_id = c.id AND c.department_id = d.id AND d.faculty_id = e.id AND e.university_id = f.id AND f.id = ${id};`
    );

    return students[0][0]['n'];
  }

  async getUniversityStudents(id: number) {
    const students = await (await dbProviders[0].useFactory()).query(
      `SELECT g.id, g.avatar_salt, g.last_name, g.first_name, g.middle_name, g.rating, b.fullname, b.id as group_id FROM students a, \`groups\` b, directions c, departments d, faculties e, universities f, users g 
      WHERE a.user_id = g.id AND a.group_id = b.id AND b.direction_id = c.id AND c.department_id = d.id AND d.faculty_id = e.id AND e.university_id = f.id AND f.id = ${id};`
    );

    return students[0];
  }

  async addUniversityFile(id: number, content_salt) {
    const content = await this.userContent.create({ university_id: id, content_salt });
    return content;
  }

  async getUniversityFiles(id: number) {
    const content = await this.userContent.findAll({ where: { university_id: id } });
    return content;
  }

}
