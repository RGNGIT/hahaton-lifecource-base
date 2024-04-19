import { Module } from '@nestjs/common';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { testProviders } from './providers/test.providers';
import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';

@Module({
  imports: [SequelizeModule],
  controllers: [TestController],
  providers: [TestService, QuestionService, AnswerService, ...testProviders]
})

export class TestModule { }