import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './entities/ride.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RideService {
  constructor(
    @InjectModel(Ride)
    private rideRepository: typeof Ride,
  ) {}

  create(createRideDto: CreateRideDto) {
    try {
      const newRide = new Ride({
        initPoint: `${createRideDto.lat},${createRideDto.lon}`,
        riderId: createRideDto.riderId,
        initTime: new Date().toISOString(),
      });
      newRide.status = 'inProgress';
      newRide.save();
    } catch (error) {}
  }
}
