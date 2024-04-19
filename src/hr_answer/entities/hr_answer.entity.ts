import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Appeal } from "src/achievement/entities/appeal.entity";

@Table
export class HrAnswer extends Model {
  @Column
  text: string;

  @ForeignKey(() => Appeal)
  @Column
  appeal_id: number;

  @BelongsTo(() => Appeal)
  appeal: Appeal;
}


