import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { localityProvider } from './providers/locality.providers';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { regionProvider } from './providers/region.providers';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

@Module({
  imports: [SequelizeModule],
  controllers: [LocalityController, RegionController],
  providers: [LocalityService, RegionService, ...localityProvider, ...regionProvider],
})
export class LocalityModule { }
