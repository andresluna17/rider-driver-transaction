import { BOOLEAN, FLOAT } from 'sequelize';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'driver',
})
export class Driver extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column({
    type: BOOLEAN,
  })
  inService: boolean;

  @Column({
    type: FLOAT,
  })
  latitude: number;

  @Column({
    type: FLOAT,
  })
  longitude: number;

  @Column({
    values: ['active', 'inactive'],
  })
  status: string;
}
