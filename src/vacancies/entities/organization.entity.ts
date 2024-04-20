import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Vacancy } from "./vacancy.entity";

@Table
export class Organization extends Model {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column
  name: string;

  @Column
  short_name: string;

  @Column
  description: string;

  @Column
  INN: string;

  @Column
  OGRN: string;

  @Column
  photo: string;

  @HasMany(() => Vacancy)
  vacancies: Vacancy;

}