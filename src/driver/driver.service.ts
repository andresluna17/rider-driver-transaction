import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver)
    private driverRepository: typeof Driver,
  ) {}

  create(createDriverDto: CreateDriverDto) {
    return this.driverRepository.create(createDriverDto as any);
  }

  findAll() {
    return this.driverRepository.findAll();
  }

  findOne(id: number) {
    return this.driverRepository.findOne({ where: { id } });
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return this.driverRepository.update(
      { where: { id } },
      updateDriverDto as any,
    );
  }

  remove(id: number) {
    return this.driverRepository.destroy({ where: { id } });
  }
}
