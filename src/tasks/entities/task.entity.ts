import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'task',
})
export class Task extends Model {
  @Column
  title: string;

  @Column
  description: string;
}
