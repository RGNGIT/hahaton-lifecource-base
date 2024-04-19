import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@nestjs/core';
import path from '../common/path';
import { DepartmentsModule } from 'src/departments/departments.module';
import { PortalModule } from 'src/portal/portal.module';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { TopicModule } from 'src/topic/topic.module';
import { CdnModule } from 'src/cdn/cdn.module';
import { TestModule } from 'src/test/test.module';
import { HrAnswerModule } from 'src/hr_answer/hr_answer.module';
import { InvitationsModule } from 'src/invitations/invitations.module';
import { LocalityModule } from 'src/localities/locality.module';
import { UniversityModule } from 'src/university/university.module';
import { AchievementModule } from 'src/achievement/achievement.module';
import { EventModule } from 'src/event/event.module';
import { PublicationModule } from 'src/publication/publication.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PortalModule,
    DepartmentsModule,
    LocalityModule,
    RoleModule,
    JwtModule,
    TestModule,
    TopicModule,
    CdnModule,
    HrAnswerModule,
    InvitationsModule,
    UniversityModule,
    AchievementModule,
    EventModule,
    RouterModule.register([{
      path: path.API_REQUEST,
      children: [{
        path: path.USER_MODULE,
        module: UserModule
      },
      {
        path: path.PORTAL_MODULE,
        module: PortalModule
      },
      {
        path: path.DEPARTMENTS_MODULE,
        module: DepartmentsModule
      },
      {
        path: path.LOCALITY_MODULE,
        module: LocalityModule
      },
      {
        path: path.ROLE_MODULE,
        module: RoleModule
      },
      {
        path: path.AUTH_MODULE,
        module: AuthModule
      },
      {
        path: path.TOPIC_MODULE,
        module: TopicModule
      },
      {
        path: path.HRANSWER_MODULE,
        module: HrAnswerModule
      },
      {
        path: path.INVITATION_MODULE,
        module: InvitationsModule
      },
      {
        path: path.UNIVERSTY_MODULE,
        module: UniversityModule
      },
      {
        path: path.ACHIEVEMENT_MODULE,
        module: AchievementModule
      },
      {
        path: path.EVENT_MODULE,
        module: EventModule
      },
      {
        path: path.PUBLICATION_MODULE,
        module: PublicationModule
      },
      ]
    },
    {
      path: path.CDN_MODULE,
      module: CdnModule
    },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
