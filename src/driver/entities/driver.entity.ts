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
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column({
    values: ['active', 'inactive'],
  })
  status: string;
}
