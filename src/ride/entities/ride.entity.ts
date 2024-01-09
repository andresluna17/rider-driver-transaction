import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Driver } from 'src/driver/entities/driver.entity';
import { Rider } from 'src/rider/entities/rider.entity';

@Table({
  tableName: 'ride',
})
export class Ride extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Rider)
  @Column({ field: 'id' })
  riderId: number;

  @BelongsTo(() => Rider)
  rider: Rider;

  @ForeignKey(() => Driver)
  @Column({ field: 'id' })
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
