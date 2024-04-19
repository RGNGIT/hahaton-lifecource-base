import { Sequelize } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
import { sequelizeConfig } from "../../config";
// import { Department } from "src/departments/entities/department.entity";
// import { Portal } from "src/portal/entities/portal.entity";
import { Role } from "src/role/entities/role.entity";
import { UserRoles } from "src/user/entities/user-roles.entity";
import { Blob } from "src/cdn/entities/blob.entity";
import { Appeal } from "src/achievement/entities/appeal.entity";
import * as mysql from 'mysql2/promise';
import { Locality } from "src/localities/entities/locality.entity";
import { Region } from "src/localities/entities/region.entity";
import { University } from "src/university/entities/university.entity";
import { Faculty } from "src/university/entities/faculty.entity";
import { Department } from "src/university/entities/department.entity";
import { Direction } from "src/university/entities/direction.entity";
import { Group } from "src/university/entities/group.entity";
import { Students } from "src/university/entities/students.entity";
import { Event } from "src/event/entities/event.entity";
import { Achievement } from "src/achievement/entities/achievement.entity";
import { Publication } from "src/publication/entities/publication.entity";
import { Admins } from "src/university/entities/admins.entity";
import { Participants } from "src/event/entities/participants.entity";
import { Vacancy } from "src/vacancies/entities/vacancy.entity";
import { UserVacancies } from "src/vacancies/entities/vacancy-user.entity";

export const dbProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const connection = await mysql.createConnection({
        host: sequelizeConfig.host,
        port: sequelizeConfig.port,
        user: sequelizeConfig.username,
        password: sequelizeConfig.password
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${sequelizeConfig.database}\`;`);

      const sequelize = new Sequelize(sequelizeConfig);
      sequelize.addModels([
        User, 
        Role, 
        UserRoles,  
        Region, 
        Locality, 
        Blob,  
        Appeal, 
        University, 
        Faculty, 
        Department, 
        Direction, 
        Group, 
        Students, 
        Admins, 
        Participants, 
        Event, 
        Achievement, 
        Publication, 
        Vacancy, 
        UserVacancies
      ]);
      await sequelize.sync({ alter: true });

      return sequelize;
    }
  }
];