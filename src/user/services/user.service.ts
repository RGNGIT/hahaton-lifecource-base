import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import CreateUserDto from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import constants from '../../common/constants';
import hash from '../../common/hash';
import UpdateUserDto from '../dto/update-user.dto';
import { Role } from '../../role/entities/role.entity';
import { UserRoles } from '../entities/user-roles.entity';
import DefineUserRoleDto from '../dto/define-user-role.dto';
import { Locality } from 'src/localities/entities/locality.entity';
import { Group } from 'src/university/entities/group.entity';
import { Students } from 'src/university/entities/students.entity';
import { Region } from 'src/localities/entities/region.entity';
import { Direction } from 'src/university/entities/direction.entity';
import { Department } from 'src/university/entities/department.entity';
import { Faculty } from 'src/university/entities/faculty.entity';
import { University } from 'src/university/entities/university.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.USERS_REPOSITORY)
    private usersRepository: typeof User,
    @Inject(constants.USER_ROLES_REPOSITORY)
    private userRolesRepository: typeof UserRoles,
    @Inject(constants.STUDENTS_REPOSITORY)
    private studentRepository: typeof Students
  ) { }

  async defineUserRole(define: DefineUserRoleDto): Promise<UserRoles> {
    const definiton = await this.userRolesRepository.create({ userId: define.user_id, roleId: define.role_id });
    return definiton;
  }

  async findOne(id): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, include: [{ model: Role }, { model: Group, include: [{ model: Direction, include: [{ model: Department, include: [{ model: Faculty }] }] }] }, { model: Locality, include: [{ model: Region }] }] });
    return user;
  }

  async findOneByEmail(email): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email }, include: { model: Role } });
    return user;
  }

  async create(newUser: CreateUserDto | UpdateUserDto): Promise<User> {
    newUser.password = hash(newUser.password);
    const user = await this.usersRepository.create({ ...newUser });
    await this.studentRepository.create({ user_id: user.id, group_id: newUser.group_id });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll({ include: { all: true } });
    return users;
  }

  async findByFio(fio: string): Promise<User[]> {
    const names = fio.split(' ').filter(name => name.trim().length > 0);

    const whereCondition = {
      [Op.or]: names.map(name => ({
        [Op.or]: [
          { first_name: { [Op.like]: '%'+name } },
          { last_name: { [Op.like]: '%'+name } },
          { middle_name: { [Op.like]: '%'+name } }
        ]
      }))
};

return this.usersRepository.findAll({
  where: whereCondition
});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | [affectedCount: number]> {
    const user = await this.usersRepository.update(updateUserDto, { where: { id } });
    return user;
  }

  async delete(id: number): Promise<User | number> {
    const user = await this.usersRepository.destroy({ where: { id } });
    return user;
  }

  async getDepartmentsHR(department_id: number): Promise<User> {
    const hr = await this.usersRepository.findOne({ where: { department_id }, include: { model: Role, where: { name: "hr_manager" } } });
    return hr;
  }

  async getPortalAdmin(portal_id: number): Promise<User> {
    const admin = await this.usersRepository.findOne({ where: { portal_id }, include: { model: Role, where: { name: "portal_admin" } } });
    return admin;
  }

  async updateUsersAvatar(id: number, avatar_salt: string) {
    const user = await this.usersRepository.update({ avatar_salt }, { where: { id } });
    return user;
  }

  async getUsersUniversity(user_id: number){
    const user = await this.usersRepository.findByPk(user_id, {include: [{model: Group, include: [{model: Direction, include: [{model: Department, include: [{model: Faculty}]}]}] }]});
    if(!user) throw new HttpException("Пользователь не найден", HttpStatus.BAD_REQUEST);
    const universities_id = []; 
    user.groups.forEach((x)=>universities_id.push(x.direction.department.faculty.university_id));
    return universities_id;
  }
}
