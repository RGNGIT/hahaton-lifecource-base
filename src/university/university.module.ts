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

@Module({
  imports: [SequelizeModule],
  controllers: [UniversityController, FacultyController, DirectionController, DirectionController, GroupController],
  providers: [UniversityService, FacultyService, DepartmentService, DirectionService, GroupService, ...universityProvider],
})
export class UniversityModule {}
