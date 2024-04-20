import { Module } from '@nestjs/common';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { userContentProvider } from './providers/user-content.providers';
import { UserContentService } from './services/user-content.service';
import { UserContentController } from './controllers/user-content.controller';

@Module({
    imports: [SequelizeModule],
    controllers: [UserContentController],
    providers: [UserContentService, ...userContentProvider],
})
export class UserContentModule {}
