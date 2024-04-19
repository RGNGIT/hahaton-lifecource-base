import { Module } from '@nestjs/common';
import { PortalService } from './portal.service';
import { PortalController } from './portal.controller';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { portalProvider } from './providers/portal.providers';
import { usersProvider } from 'src/user/providers/user.providers';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [SequelizeModule],
  controllers: [PortalController],
  providers: [PortalService, UserService, ...portalProvider, ...usersProvider],
})
export class PortalModule { }
