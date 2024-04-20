import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, Query } from '@nestjs/common';
import { AppealsService } from './appeals.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import { ApiTags } from '@nestjs/swagger'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Appeal } from './entities/appeal.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Заявка на достижения')
@Controller('appeal')
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


  @Post('all')
  @UseModel(Appeal)
  @UseInterceptors(FindInterceptor)
  filterAll(@Body() FilterDto:any){}

  // @UseGuards(JwtGuard)
  // @Get('myrequest')
  // findHRAppeal(@GetCurrentUser() user: any) {
  //   return this.appealsService.findHRAppeal(user.id);
  // }

   @Get('one/:id')
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

  @Get(':id/accept')
  accept(@Param('id') id: string) {
    return this.appealsService.accept(+id);
  }

  @Get(':id/decline')
  decline(@Param('id') id: string) {
    return this.appealsService.decline(+id);
  }
  

}
