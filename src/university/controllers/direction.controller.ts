import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { DirectionService } from '../services/direction.service';
import { CreateDirectionDto } from '../dto/create-direction.dto';
import { UpdateDirectionDto } from '../dto/update-direction.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Direction } from '../entities/direction.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';


@ApiTags('Направления подготовки')
@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post()
  create(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionService.create(createDirectionDto);
  }

  @Get()
  findAll() {
    return this.directionService.findAll();
  }

  @Post('all')
  @UseModel(Direction) 
  @UseInterceptors(FindInterceptor)
  filterData(@Body() FilterDto: any) {
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.directionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectionDto: UpdateDirectionDto) {
    return this.directionService.update(+id, updateDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionService.remove(+id);
  }
}
