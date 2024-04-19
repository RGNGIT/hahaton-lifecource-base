import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { departmentProvider } from './providers/departments.providers';
import { UserService } from 'src/user/services/user.service';
import { usersProvider } from 'src/user/providers/user.providers';

@Module({
  imports: [SequelizeModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, UserService, ...departmentProvider, ...usersProvider],
})
export class DepartmentsModule { }
