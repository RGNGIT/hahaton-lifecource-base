import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AppealsService } from './appeals.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import { ApiTags } from '@nestjs/swagger'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Заявка на достижения')
@Controller()
export class AppealsController {
  constructor(private readonly appealsService: AppealsService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createAppealDto: CreateAppealDto, @GetCurrentUser() user: any) {
    return this.appealsService.create(createAppealDto, user.id);
  }

  @Get()
  findAll() {
    return this.appealsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('myappeals')
  findUserAppeal(@GetCurrentUser() user: any) {
    return this.appealsService.findUserAppeal(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('myrequest')
  findHRAppeal(@GetCurrentUser() user: any) {
    return this.appealsService.findHRAppeal(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appealsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppealDto: UpdateAppealDto) {
    return this.appealsService.update(+id, updateAppealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appealsService.remove(+id);
  }
}
