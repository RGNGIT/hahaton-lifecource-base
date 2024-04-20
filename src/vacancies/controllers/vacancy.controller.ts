import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { UpdateVacancyDto } from '../dto/update-vacancy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Вакансии')
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) { }

  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.create(createVacancyDto);
  }

  @Get()
  findAll() {
    return this.vacancyService.findAll();
  }

  @Get('/author/:id')
  findAllByAuthor(@Param('id') id: number) {
    return this.vacancyService.findManyByAuthor(id);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.vacancyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(+id, updateVacancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacancyService.remove(+id);
  }

  @Patch('subscribe/:id')
  async addSubscriber(@Param('id') id: number, @Body() updateVacancyDto: UpdateVacancyDto) {
    const userVacancy = await this.vacancyService.subscribe(id, updateVacancyDto.subscriber_id);

    if (userVacancy == -1)
      throw new HttpException('User has already subbed to this vacancy', HttpStatus.INTERNAL_SERVER_ERROR);

    return userVacancy;
  }
}
