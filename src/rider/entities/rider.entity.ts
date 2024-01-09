import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'rider',
})
export class Rider extends Model {
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
