import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { PublicationService } from '../services/publication.service';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Publication } from '../entities/publication.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';
import { FilterDto } from 'src/common/filters/filter.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

@ApiTags('Публикации')
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@GetCurrentUser() user: any, @Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto, user.id);
  }

  @Get()
  findAll() {
    return this.publicationService.findAll();
  }


  @Get('favorites')
  @UseGuards(JwtGuard)
  GetMyFavorites(@GetCurrentUser() user: any) {
    return this.publicationService.GetMyFavorites(user.id);
  }

  @Post('all')
  @UseModel(Publication)
  @UseInterceptors(FindInterceptor)
  filterAll(@Body() FilterDto:any){}

   @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @Post('favorites')
  @UseGuards(JwtGuard)
  AddToFavorites(@GetCurrentUser() user: any, @Query('id') id: string) {
    return this.publicationService.AddToFavorites(+id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }

}
