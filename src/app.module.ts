import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiderModule } from './rider/rider.module';
import { DriverModule } from './driver/driver.module';
import { RideModule } from './ride/ride.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/config';

@Module({
  imports: [
    RiderModule,
    DriverModule,
    RideModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
