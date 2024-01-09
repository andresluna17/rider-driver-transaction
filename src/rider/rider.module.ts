import { Module } from '@nestjs/common';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rider } from './entities/rider.entity';

@Module({
  imports: [SequelizeModule.forFeature([Rider])],
  controllers: [RiderController],
  providers: [RiderService],
})
export class RiderModule {}
