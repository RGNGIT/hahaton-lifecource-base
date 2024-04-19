import { Injectable, Inject } from '@nestjs/common';
import CreateUserDto from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import constants from '../../common/constants';
import hash from '../../common/hash';
import UpdateUserDto from '../dto/update-user.dto';
import { Role } from '../../role/entities/role.entity';
import { UserRoles } from '../entities/user-roles.entity';
import DefineUserRoleDto from '../dto/define-user-role.dto';
import { Department } from 'src/departments/entities/department.entity';
import { Portal } from 'src/portal/entities/portal.entity';
import { Locality } from 'src/localities/entities/locality.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.USERS_REPOSITORY)
    private usersRepository: typeof User,
    @Inject(constants.USER_ROLES_REPOSITORY)
    private userRolesRepository: typeof UserRoles
  ) { }

  async defineUserRole(define: DefineUserRoleDto): Promise<UserRoles> {
    const definiton = await this.userRolesRepository.create({ ...define });
    return definiton;
  }

  async findOne(id): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, include: [{ model: Role }, { model: Department }, { model: Locality }, { model: Portal }] });
    return user;
  }

  async findOneByEmail(email): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email }, include: { model: Role } });
    return user;
  }

  async create(newUser: CreateUserDto | UpdateUserDto): Promise<User> {
    newUser.password = hash(newUser.password);
    const user = await this.usersRepository.create({ ...newUser });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll({ include: { all: true } });
    return users;
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
}