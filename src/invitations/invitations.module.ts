import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { invitationProvider } from './providers/invitation.providers';

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsService, ...invitationProvider],
})
export class InvitationsModule { }
