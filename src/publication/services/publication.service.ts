import { Inject, Injectable } from '@nestjs/common';

import constants from 'src/common/constants';
import { Publication } from '../entities/publication.entity';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { Favorites } from '../entities/favorites.entity';
import sequelize, { Model } from 'sequelize';

@Injectable()
export class PublicationService {
  constructor(
    @Inject(constants.PUBLICATION_REPOSITORY)
    private publicationsRepository: typeof Publication,
    @Inject(constants.FAVORITES_REPOSITORY)
    private favoritesRepository: typeof Favorites,
  ) { }

  async create(createPublicationDto: CreatePublicationDto, user_id: number) {
    const publication = await this.publicationsRepository.create({ author_id: user_id, ...createPublicationDto });
    return publication;
  }

  async findAll() {
    const publications = await this.publicationsRepository.findAll({ include: { all: true } });
    return publications;
  }

  async findOne(id: number) {
    const publication = await this.publicationsRepository.findOne({ where: { id }, include: { all: true } });
    return publication;
  }


  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationsRepository.update({ ...updatePublicationDto }, { where: { id } });
    return publication;
  }

  async remove(id: number) {
    const publication = await this.publicationsRepository.destroy({ where: { id } });
    return publication;
  }

  async AddToFavorites(publication_id: number, user_id: number) {
    const favorites = await this.favoritesRepository.create({ user_id, publication_id });

    await this.publicationsRepository.update({likes: sequelize.literal('likes + 1') }, { where: { publication_id } });
    return favorites;
  }

  async GetMyFavorites(user_id: number){
    const favorites = await this.favoritesRepository.findAll({where: {user_id}, include: { model: Publication } });
    return favorites;
  }
}
