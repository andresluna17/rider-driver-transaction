import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript';
import { Driver } from 'src/driver/entities/driver.entity';
import { Rider } from 'src/rider/entities/rider.entity';

@Table({
  tableName: 'ride',
})
@DefaultScope(() => ({
  include: [{ model: Rider }, { model: Driver }],
}))
export class Ride extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Rider)
  @Column
  riderId: number;

  @BelongsTo(() => Rider)
  rider: Rider;

  @ForeignKey(() => Driver)
  @Column
  driverId: number;

  @BelongsTo(() => Driver)
  driver: Driver;

  @Column
  initPoint: string;

  @Column
  endPoint: string;

  @Column
  price: number;

  @Column
  initTime: string;

  @Column
  endTime: string;

  @Column
  transactionId: string;

  @Column({
    values: ['inProgress', 'completed', 'canceled', 'created'],
    defaultValue: 'created',
  })
  status: string;
}
