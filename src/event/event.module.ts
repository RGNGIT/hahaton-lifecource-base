import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { eventProvider } from './providers/event.providers';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { FindService } from 'src/common/filters/find.service';

@Module({
  imports: [SequelizeModule],
  controllers: [EventController],
  providers: [EventService, FindService, ...eventProvider],
})
export class EventModule {}
