import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Регион')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionsService: RegionService) { }
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
