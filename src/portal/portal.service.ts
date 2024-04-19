import { Inject, Injectable } from '@nestjs/common';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import constants from 'src/common/constants';
import { Portal } from './entities/portal.entity';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';
import { Department } from 'src/departments/entities/department.entity';
import UpdateUserDto from 'src/user/dto/update-user.dto';

@Injectable()
export class PortalService {
  constructor(
    @Inject(constants.PORTAL_REPOSITORY)
    private portalRepository: typeof Portal,
    private readonly usersService: UserService
  ) { }
  async create(createPortalDto: CreatePortalDto) {
    const newportal = await this.portalRepository.create({ ...createPortalDto });

    const userRole = await this.usersService.defineUserRole({ user_id: createPortalDto.admin_id, role_id: 2 }); //PORTAL_ADMIN
    const user = await this.usersService.update(createPortalDto.admin_id, { portal_id: newportal.id } as UpdateUserDto);

    return newportal;
  }

  async findAll() {
    const portals = await this.portalRepository.findAll({ include: { all: true } });
    return portals;
  }

  async findOne(id: number) {
    const portal = await this.portalRepository.findOne({ where: { id }, include: [{ model: User }, { model: Department }] });
    const admin = await this.usersService.getPortalAdmin(id);

    const portal_ref = {
      admin: admin,
      portal: {}
    }
    portal_ref.portal = portal;
    return portal_ref;
  }

  async update(id: number, updatePortalDto: UpdatePortalDto) {
    const portal = await this.portalRepository.update({ ...updatePortalDto }, { where: { id } });
    return portal;
  }

  async remove(id: number) {
    const portal = await this.portalRepository.destroy({ where: { id } });  //flag?
    return portal;
  }
}
