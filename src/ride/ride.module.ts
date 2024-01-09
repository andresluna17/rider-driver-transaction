import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { Ride } from './entities/ride.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Ride])],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
