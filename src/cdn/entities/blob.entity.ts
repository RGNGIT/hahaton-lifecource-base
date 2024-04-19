import { Model, Column, HasMany, Table } from "sequelize-typescript";


@Table
export class Blob extends Model {
  @Column
  key: string;
}