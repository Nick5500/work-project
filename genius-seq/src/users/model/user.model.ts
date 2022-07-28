import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Pet } from './pet.model';

@Table({ timestamps: false })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  firstName: string;

  @HasMany(() => Pet)
  pet: Pet[];
}
