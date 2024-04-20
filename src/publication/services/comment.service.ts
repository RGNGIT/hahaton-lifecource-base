import { Inject, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { Publication } from '../entities/publication.entity';
import constants from 'src/common/constants';
import { Favorites } from '../entities/favorites.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comments.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject(constants.COMMENTS_REPOSITORY)
    private commentsRepository: typeof Comment
  ) { }

  async create(CreateCommentDto: CreateCommentDto, user_id: number){
    const comment = await this.commentsRepository.create({ author_id: user_id,  ...CreateCommentDto });
    return comment;
  }


  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({ where: { id }, include: { all: true } });
    return comment;
  }


  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.update({ ...updateCommentDto }, { where: { id } });
    return comment;
  }


  async remove(id: number) {
    const comment = await this.commentsRepository.destroy({ where: { id } });
    return comment;
  }

}
