import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Приглашения')
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) { }

  @Post()
  create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationsService.create(createInvitationDto);
  }

  @Get()
  findAll() {
    return this.invitationsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('myinvites')
  findMyInvites(@GetCurrentUser() user: any) {
    return this.invitationsService.findMyInvites(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return this.invitationsService.update(+id, updateInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(+id);
  }
}
