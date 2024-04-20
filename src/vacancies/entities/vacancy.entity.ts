import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { UserVacancies } from './vacancy-user.entity';
import { Locality } from 'src/localities/entities/locality.entity';

@Table
export class Vacancy extends Model {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  // Заголовок
  @Column
  header: string;

  // Дескрипшн
  @Column({ type: DataType.TEXT })
  description: string;

  @BelongsToMany(() => User, () => UserVacancies)
  users: User[];

  @ForeignKey(() => User)
  @Column
  author_id: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => Locality)
  @Column
  locality_id: number;
  
  @BelongsTo(() => Locality)
  locality: Locality;
}

