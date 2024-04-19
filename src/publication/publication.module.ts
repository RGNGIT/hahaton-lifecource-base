import { Module } from '@nestjs/common';
import { PublicationService } from './services/publication.service';
import { PublicationController } from './controllers/publication.controller';
import { publicationProvider } from './providers/publication.provider';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { FindService } from 'src/common/filters/find.service';

@Module({
  imports: [SequelizeModule],
  controllers: [PublicationController],
  providers: [PublicationService, FindService, ...publicationProvider],
})
export class PublicationModule {}
