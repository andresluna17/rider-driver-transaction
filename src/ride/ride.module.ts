import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { Ride } from './entities/ride.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { WompiService } from './wompi/wompi.service';

@Module({
  imports: [SequelizeModule.forFeature([Ride]), HttpModule],
  controllers: [RideController],
  providers: [RideService, WompiService],
})
export class RideModule {}
