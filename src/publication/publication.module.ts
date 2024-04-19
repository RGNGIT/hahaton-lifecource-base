import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { publicationProvider } from './providers/publication.provider';
import { SequelizeModule } from 'src/sequelize/sequelize.module';

@Module({
  imports: [SequelizeModule],
  controllers: [PublicationController],
  providers: [PublicationService, ...publicationProvider],
})
export class PublicationModule {}
