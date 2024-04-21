import { Module } from '@nestjs/common';
import { PublicationService } from './services/publication.service';
import { PublicationController } from './controllers/publication.controller';
import { publicationProvider } from './providers/publication.provider';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { FindService } from 'src/common/filters/find.service';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';

@Module({
  imports: [SequelizeModule],
  controllers: [PublicationController, CommentController],
  providers: [PublicationService, CommentService, FindService, ...publicationProvider],
})
export class PublicationModule {}
