import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { AppealsService } from './appeals.service';
import { AppealsController } from './appeals.controller';
import { FindService } from 'src/common/filters/find.service';
import { usersProvider } from 'src/user/providers/user.providers';
import { achievementProvider } from './providers/achievement.provider';

@Module({
  imports: [SequelizeModule],
  controllers: [AchievementController, AppealsController],
  providers: [AchievementService, AppealsService, FindService, ...achievementProvider, ...usersProvider],
})
export class AchievementModule {}
