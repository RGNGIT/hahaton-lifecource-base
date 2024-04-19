import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { achievementProvider } from './providers/achievement.provider';
import { AppealsService } from './appeals.service';
import { AppealsController } from './appeals.controller';

@Module({
  imports: [SequelizeModule],
  controllers: [AchievementController, AppealsController],
  providers: [AchievementService, AppealsService, ...achievementProvider],
})
export class AchievementModule {}
