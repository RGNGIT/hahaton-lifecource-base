import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { UniversityService } from '../services/university.service';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import { ApiTags } from '@nestjs/swagger';
import { University } from '../entities/university.entity';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('ВУЗы')
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @Post('all')
  @UseModel(University) 
  @UseInterceptors(FindInterceptor)
  filterData(@Body() FilterDto: any) {
    // return this.universalFindService.findAll(University, FilterDto);
  }

  @Get()
  findAll(){
    return this.universityService.findAll();
  }

   @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.universityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universityService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universityService.remove(+id);
  }
}
