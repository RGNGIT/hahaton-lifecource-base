import { Module } from '@nestjs/common';
import { VacancyService } from './services/vacancy.service';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { vacancyProvider } from './providers/vacancy.providers';
import { VacancyController } from './controllers/vacancy.controller';

@Module({
  imports: [SequelizeModule],
  controllers: [VacancyController],
  providers: [VacancyService, ...vacancyProvider],
})
export class VacancyModule {}
