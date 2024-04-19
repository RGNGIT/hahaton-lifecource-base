import { Inject, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import constants from 'src/common/constants';

@Injectable()
export class PublicationService {
  constructor(
    @Inject(constants.PUBLICATION_REPOSITORY)
    private publicationsRepository: typeof Publication
  ) { }

  async create(createPublicationDto: CreatePublicationDto) {
    const faculty = await this.publicationsRepository.create({ ...createPublicationDto });
    return faculty;
  }

  async findAll() {
    const faculties = await this.publicationsRepository.findAll({ include: { all: true } });
    return faculties;
  }

  async findOne(id: number) {
    const faculty = await this.publicationsRepository.findOne({ where: { id }, include: { all: true } });
    return faculty;
  }


  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const faculty = await this.publicationsRepository.update({ ...updatePublicationDto }, { where: { id } });
    return faculty;
  }

  async remove(id: number) {
    const faculty = await this.publicationsRepository.destroy({ where: { id } });
    return faculty;
  }
}
