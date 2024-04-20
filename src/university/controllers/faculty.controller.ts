import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { FacultyService } from '../services/faculty.service';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Faculty } from '../entities/faculty.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Факультеты')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.create(createFacultyDto);
  }

  @Get()
  findAll() {
    return this.facultyService.findAll();
  }

  @Post('all')
  @UseModel(Faculty) 
  @UseInterceptors(FindInterceptor)
  filterData(@Body() FilterDto: any) {
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    return this.facultyService.update(+id, updateFacultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}
