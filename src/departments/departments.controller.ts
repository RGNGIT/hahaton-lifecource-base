import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Подразделения')
@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Post('new')
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get('all')
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
