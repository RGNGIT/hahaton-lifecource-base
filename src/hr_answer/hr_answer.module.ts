import { Module } from '@nestjs/common';
import { HrAnswerService } from './hr_answer.service';
import { HrAnswerController } from './hr_answer.controller';
import { hrAppealProvider } from './providers/hr_answer.provider';

@Module({
  controllers: [HrAnswerController],
  providers: [HrAnswerService, ...hrAppealProvider],
})
export class HrAnswerModule { }
