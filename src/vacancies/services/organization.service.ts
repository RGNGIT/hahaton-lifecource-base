import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { Organization } from '../entities/organization.entity';
import constants from 'src/common/constants';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(constants.ORGANIZATIONS_REPOSITORY)
    private organizationsRepository: typeof Organization,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = await this.organizationsRepository.create({ ...createOrganizationDto });
    return organization;
  }

  async findAll() {
    const organizations = await this.organizationsRepository.findAll({ include: { all: true } });
    return organizations;
  }

  async findOne(id: number) {
    const organization = await this.organizationsRepository.findOne({ where: { id }, include: { all: true } });
    return organization;
  }

  async update(id: number, updateDepartmentDto: UpdateOrganizationDto) {
    const organization = await this.organizationsRepository.update({ ...updateDepartmentDto }, { where: { id } });
    return organization;
  }

  async remove(id: number) {
    const organization = await this.organizationsRepository.destroy({ where: { id } });
    return organization;
  }
}
