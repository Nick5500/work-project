import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING })
  email: string;

  @Column({ type: DataTypes.STRING })
  password: string;

  @Column({ type: DataTypes.STRING })
  refresh_token: string;
}
