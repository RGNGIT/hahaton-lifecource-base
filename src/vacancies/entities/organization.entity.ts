import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Vacancy } from "./vacancy.entity";
import { User } from "src/user/entities/user.entity";
import { Locality } from "src/localities/entities/locality.entity";

@Table
export class Organization extends Model {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column
  name: string;

  @Column
  short_name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column
  address: string;

  @Column
  INN: string;

  @Column
  OGRN: string;

  @Column
  photo: string;


  @HasMany(() => Vacancy)
  vacancies: Vacancy;

  @ForeignKey(() => User)
  @Column
  owner_id: number;

  @BelongsTo(() => User, 'owner_id')
  owner: User;

  @ForeignKey(() => Locality)
  @Column
  locality_id: number;

  @BelongsTo(() => Locality)
  locality: Locality;

}