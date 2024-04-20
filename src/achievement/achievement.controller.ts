import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Achievement } from './entities/achievement.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Достижения')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementService.create(createAchievementDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    return this.achievementService.findAll(queryParams);
  }

   @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.achievementService.findOne(+id);
  }

  @Post('all')
  @UseModel(Achievement)
  @UseInterceptors(FindInterceptor)
  filterAll(@Body() FilterDto:any){}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementService.update(+id, updateAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementService.remove(+id);
  }

  @Get("/top")
  async getTop10() {
    return await this.achievementService.getTop10ByValue();
  }
}
