import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicService } from '../services/topic.service';
import CreateTopicDto from '../dto/create-topic.dto';
import UpdateTopicDto from '../dto/update-topic.dto';
import UpdateTopicFileSaltDto from '../dto/update-topic-file-salt.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Темы тестирования')
@Controller()
export class TopicController {
  constructor(private readonly topicService: TopicService) { }

  @Post('new')
  postNewRole(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get('all')
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }

  @Patch('connectWithMaterial/:id')
  connectWithMaterial(@Param('id') id: string, @Body() updateTopicFileSaltDto: UpdateTopicFileSaltDto) {
    return this.topicService.updateFileSalt(+id, updateTopicFileSaltDto);
  }
}