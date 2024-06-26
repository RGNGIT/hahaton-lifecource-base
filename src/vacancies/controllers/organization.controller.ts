import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { Organization } from '../entities/organization.entity';
import { FindInterceptor } from 'src/common/filters/find.interceptor';

@ApiTags('Организации')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Post('all')
  @UseModel(Organization) 
  @UseInterceptors(FindInterceptor)
  filterData(@Body() FilterDto: any) { }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }

}
