import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import constants from 'src/common/constants';
import { Group } from '../entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @Inject(constants.GROUP_REPOSITORY)
    private groupsRepository: typeof Group
  ) { }

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.groupsRepository.create({ ...createGroupDto });
    return group;
  }

  async findAll() {
    const groups = await this.groupsRepository.findAll({ include: { all: true } });
    return groups;
  }

  async findOne(id: number) {
    const group = await this.groupsRepository.findOne({ where: { id }, include: { all: true } });
    return group;
  }


  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.update({ ...updateGroupDto }, { where: { id } });
    return group;
  }

  async remove(id: number) {
    const group = await this.groupsRepository.destroy({ where: { id } });
    return group;
  }
}
