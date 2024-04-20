import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Department } from '../entities/department.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Кафедры')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Post('all')
  @UseModel(Department) 
  @UseInterceptors(FindInterceptor)
  filterData(@Body() FilterDto: any) {
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
