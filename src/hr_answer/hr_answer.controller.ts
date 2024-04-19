import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HrAnswerService } from './hr_answer.service';
import { CreateHrAnswerDto } from './dto/create-hr_answer.dto';
import { UpdateHrAnswerDto } from './dto/update-hr_answer.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Ответы на обращения')
@Controller()
export class HrAnswerController {
  constructor(private readonly hrAnswerService: HrAnswerService) { }

  @Post()
  create(@Body() createHrAnswerDto: CreateHrAnswerDto) {
    return this.hrAnswerService.create(createHrAnswerDto);
  }

  @Get()
  findAll() {
    return this.hrAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrAnswerDto: UpdateHrAnswerDto) {
    return this.hrAnswerService.update(+id, updateHrAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrAnswerService.remove(+id);
  }
}
