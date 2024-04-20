import { Module } from '@nestjs/common';
import { UniversityService } from './services/university.service';
import { UniversityController } from './controllers/university.controller';
import { universityProvider } from './providers/university.providers';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { FacultyService } from './services/faculty.service';
import { DepartmentService } from './services/department.service';
import { DirectionService } from './services/direction.service';
import { GroupService } from './services/group.service';
import { FacultyController } from './controllers/faculty.controller';
import { DirectionController } from './controllers/direction.controller';
import { GroupController } from './controllers/group.controller';
import { DepartmentController } from './controllers/department.controller';
import { FindService } from 'src/common/filters/find.service';
import { usersProvider } from 'src/user/providers/user.providers';
import { userContentProvider } from 'src/user-content/providers/user-content.providers';

@Module({
  imports: [SequelizeModule],
  controllers: [UniversityController, FacultyController, DepartmentController, DirectionController, GroupController],
  providers: [UniversityService, FacultyService, DepartmentService, DirectionService, GroupService, FindService, ...universityProvider, ...usersProvider, ...userContentProvider],
})
export class UniversityModule {}
