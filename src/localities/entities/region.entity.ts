import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Locality } from "./locality.entity";

@Table
export class Region extends Model {
  @Column
  name: string;

  @HasMany(() => Locality)
  localities: Locality[];
}