import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Group } from '../entities/group.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Группы')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }
  
  @Post('all')
  @UseModel(Group) 
  @UseInterceptors(FindInterceptor)
  filterData(@Body() FilterDto: any) {
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
