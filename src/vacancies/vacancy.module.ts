import { Module } from '@nestjs/common';
import { VacancyService } from './services/vacancy.service';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { vacancyProvider } from './providers/vacancy.providers';
import { VacancyController } from './controllers/vacancy.controller';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';

@Module({
  imports: [SequelizeModule],
  controllers: [VacancyController, OrganizationController],
  providers: [VacancyService, OrganizationService, ...vacancyProvider],
})
export class VacancyModule {}
