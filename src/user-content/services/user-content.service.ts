import { Inject, Injectable } from '@nestjs/common';
import constants from "../../common/constants";
import { UserContent } from '../entities/user-content-unit.entity';
import CreateUserContentDto from '../dto/create-user-content.dto';
import { UpdateUserContentDto } from '../dto/update-user-content.dto';

@Injectable()
export class UserContentService {
  constructor(
    @Inject(constants.USER_CONTENT_REPOSITORY)
    private userContentRepository: typeof UserContent
  ) { }

  async create(createUserContentDto: CreateUserContentDto): Promise<UserContent> {
    const content = this.userContentRepository.create({ ...createUserContentDto });
    return content;
  }

  async findAll(): Promise<UserContent[]> {
    const contents = await this.userContentRepository.findAll();
    return contents;
  }

  async findOne(id: number): Promise<UserContent> {
    const content = await this.userContentRepository.findByPk(id);
    return content;
  }

  async findOneByUserId(id: number) {
    const contents = await this.userContentRepository.findAll({ where: { author_id: id } });
    return contents;
  }

  async update(id: number, updateUserContentDto: UpdateUserContentDto): Promise<UserContent | [affectedRows: number]> {
    const content = await this.userContentRepository.update(updateUserContentDto, { where: { id } });
    return content;
  }

  async delete(id: number): Promise<UserContent | number> {
    const content = await this.userContentRepository.destroy({ where: { id } });
    return content;
  }
}
