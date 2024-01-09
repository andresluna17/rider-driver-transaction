import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rider } from './entities/rider.entity';

@Injectable()
export class RiderService {
  constructor(
    @InjectModel(Rider)
    private riderRepository: typeof Rider,
  ) {}

  create(createRiderDto: CreateRiderDto) {
    return this.riderRepository.create(createRiderDto as any);
  }

  findAll() {
    return this.riderRepository.findAll();
  }

  findOne(id: number) {
    return this.riderRepository.findOne({ where: { id } });
  }

  update(id: number, updateRiderDto: UpdateRiderDto) {
    return this.riderRepository.update({ where: id }, updateRiderDto as any);
  }

  remove(id: number) {
    return this.riderRepository.destroy({ where: { id } });
  }
}
