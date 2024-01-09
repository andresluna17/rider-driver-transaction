import { Controller, Post, Body, Param } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { FinishRideDto } from './dto/finish-ride.dto';
@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Post('/:id')
  finishRide(@Param('id') id: string, @Body() finishRideDto: FinishRideDto) {
    return this.rideService.finish(id, finishRideDto);
  }
}
