import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserContentService } from '../services/user-content.service';
import CreateUserContentDto from '../dto/create-user-content.dto';
import { UpdateUserContentDto } from '../dto/update-user-content.dto';

@ApiTags('Пользовательский контент')
@Controller('userContent')
export class UserContentController {
  constructor(private readonly userContentService: UserContentService) {}

  @Post()
  create(@Body() createUserContentDto: CreateUserContentDto) {
    return this.userContentService.create(createUserContentDto);
  }

  @Get()
  findAll() {
    return this.userContentService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.userContentService.findOne(+id);
  }

  @Get('user/:id')
  getContentsOfUser(@Param('id') id: number) {
    return this.userContentService.findOneByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserContentDto: UpdateUserContentDto) {
    return this.userContentService.update(+id, updateUserContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userContentService.delete(+id);
  }
}
