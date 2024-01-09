import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'product',
})
export class Rider extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  status: string;
}
