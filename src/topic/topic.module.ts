import { Module } from '@nestjs/common';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { topicProviders } from './providers/topic.providers';
import {TopicService} from './services/topic.service';
import {TopicController} from './controllers/topic.controller';

@Module({
  imports: [SequelizeModule],
  controllers: [TopicController],
  providers: [ TopicService, ...topicProviders ]
})

export class TopicModule {}