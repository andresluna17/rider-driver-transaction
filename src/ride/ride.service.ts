import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './entities/ride.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from 'src/driver/entities/driver.entity';
import { FinishRideDto } from './dto/finish-ride.dto';
import { getDistanceKM } from '../utils/getDistance';
import { WompiService } from './wompi/wompi.service';

const baseFee = 3500;
@Injectable()
export class RideService {
  constructor(
    @InjectModel(Ride)
    private rideRepository: typeof Ride,
    @InjectModel(Driver)
    private driverRepository: typeof Driver,
    private wompiService: WompiService,
  ) {}

  async create(createRideDto: CreateRideDto) {
    try {
      const drivers = await this.driverRepository.findAll({
        where: { status: 'active', inService: false },
      });
      const radioSearch = 5;
      const driver = drivers
        .filter(
          (driver) =>
            Math.ceil(
              getDistanceKM(
                driver.latitude,
                driver.longitude,
                createRideDto.lat,
                createRideDto.lon,
              ),
            ) < radioSearch,
        )
        .slice()[0];
      if (driver) {
        const newRide = new Ride({
          initPoint: `${createRideDto.lat},${createRideDto.lon}`,
          riderId: createRideDto.riderId,
          initTime: new Date().toISOString(),
          driverId: driver.id,
          status: 'inProgress',
        });
        driver.inService = true;
        driver.save();
        await newRide.save();
        return this.rideRepository.findOne({ where: { id: newRide.id } });
      } else throw new BadRequestException({ message: 'No drivers nearby' });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error, 'Error');
    }
  }

  async finish(id: string, finishRideDto: FinishRideDto) {
    try {
      const ride = await this.rideRepository.findOne({
        where: {
          id,
          status: 'inProgress',
        },
      });

      if (ride) {
        ride.endPoint = `${finishRideDto.lat},${finishRideDto.lon}`;
        const [initLat, initLon] = ride.initPoint.split(',');
        const kmRide = getDistanceKM(
          initLat,
          initLon,
          finishRideDto.lat,
          finishRideDto.lon,
        );
        const totalKmPrice = Math.ceil(kmRide) * 100;
        const endTime = new Date();
        ride.endTime = endTime.toISOString();
        const minutesRide =
          (endTime.getTime() - new Date(ride.initTime).getTime()) / 60000;
        const totalMinutePrice = minutesRide * 200;
        const totalPriceRide = Math.ceil(
          totalKmPrice + totalMinutePrice + baseFee,
        );
        ride.price = totalPriceRide;
        ride.status = 'completed';
        const wompiTransaction = await this.wompiService.createTransaction(
          totalPriceRide,
          ride.rider,
          finishRideDto.tokenCardId,
          ride.id.toString(),
        );
        ride.transactionId = wompiTransaction.id;
        ride.save();
        return { ride, wompiTransaction };
      } else {
        throw new BadRequestException({ message: 'Ride Finish or Canceled' });
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error, 'Error');
    }
  }
}
