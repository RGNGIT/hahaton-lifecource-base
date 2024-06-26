import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import CreateUserDto from '../dto/create-user.dto';
import { UserService } from '../services/user.service';
import UpdateUserDto from '../dto/update-user.dto';
import { createConfirmationUser, checkConfirm } from '../../helpers/email-confirm';
import DefineUserRoleDto from '../dto/define-user-role.dto';
import { ApiTags } from '@nestjs/swagger'
import { RoleService } from 'src/role/services/role.service';
import FriendDto from '../dto/friend.dto';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { User } from '../entities/user.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Пользователи')
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) { }
  @Patch('updateAvatar')
  async updateAvatar(@Body() updateUser: UpdateUserDto) {
    const user = await this.userService.findOne(updateUser.id);

    if (!user)
      throw new HttpException('User not found', HttpStatus.INTERNAL_SERVER_ERROR);

    await this.userService.updateUsersAvatar(user.id, updateUser.avatar_salt);
  }

  @Post('createOnPortal')
  async postNewUser(@Body() createUser: CreateUserDto) {
    if (createUser.is_admin) {
      const user = await this.userService.create(createUser);

      const roleDto = new DefineUserRoleDto();
      roleDto.role_id = (await this.roleService.getRoleByName('Админ')).id;
      roleDto.user_id = user.id;

      await this.defineRole(roleDto);

      return await this.userService.findOne(user.id);
    } else {
      const result = await createConfirmationUser(createUser);

      if (!result)
        throw new HttpException('Something happened while processing', HttpStatus.INTERNAL_SERVER_ERROR);

      return 1;
    }
  }

  @Post('createUser')
  async createUser(@Body() createUser: UpdateUserDto) {
    return await this.userService.create(createUser);
  }

  @Post('createWorkgiver')
  async createWorkgiver(@Body() createUser: CreateUserDto) {
    const user = await this.userService.create(createUser);

    const roleDto = new DefineUserRoleDto();
    roleDto.role_id = (await this.roleService.getRoleByName('Работодатель')).id;
    roleDto.user_id = user.id;

    await this.defineRole(roleDto);

    return await this.userService.findOne(user.id);
  }

  @Post('defineRole')
  async defineRole(@Body() defineUserRoleDto: DefineUserRoleDto) {
    const result = await this.userService.defineUserRole(defineUserRoleDto);
    return result;
  }

  @Get('confirmRegistration')
  async confirmRegistration(@Query('u') u, @Query('c') c) {
    const checkedConfirmUser = checkConfirm(u, c);

    if (!checkedConfirmUser)
      throw new HttpException('No such record', HttpStatus.NOT_FOUND);

    const user = await this.userService.create(checkedConfirmUser.UserData);

    const roleDto = new DefineUserRoleDto();
    roleDto.role_id = (await this.roleService.getRoleByName('Студент')).id;
    roleDto.user_id = user.id;

    await this.defineRole(roleDto);

    return await this.userService.findOne(user.id);
  }

  @Get('one/:id')
  async findOne(@Param('id') id: number) {
    const { password, ...result } = (await this.userService.findOne(id)).dataValues;
    return result;
  }

  @Get('all')
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post('all')
  @UseModel(User)
  @UseInterceptors(FindInterceptor)
  filterAll(@Body() FilterDto: any) { }


  @Get('fio')
  async findByFio(@Query('q') q: string) {
    const users = await this.userService.findByFio(q);
    return users;
  }

  // DEPRECATED LOGIN MOVED TO AUTH
  // @Post('login')
  // async login(@Body() loginUser: LoginUserDto) {
  //   let foundUser = await this.userService.findOneByEmail(loginUser.email);

  //   if (!foundUser)
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);

  //   if (hash(loginUser.password) == foundUser.password)
  //     return foundUser;
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Post()
  addFriend(@Body() friendDto: FriendDto) {
    return this.userService.addFriend(friendDto.user_one, friendDto.user_two);
  }

  @Delete()
  unfriend(@Body() friendDto: FriendDto) {
    return this.userService.unfriend(friendDto.user_one, friendDto.user_two);
  }
}
