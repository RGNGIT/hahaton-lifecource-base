import { Model, BelongsTo, Column, HasMany, Table, ForeignKey } from "sequelize-typescript";
import { Test } from "./test.entity";
import { Blob } from "src/cdn/entities/blob.entity";
import { Answer } from "./answer.entity";

@Table
export class Question extends Model {
  @Column
  text: string;

  @Column
  score: number;

  @ForeignKey(() => Blob)
  @Column
  blob_id: number;

  @BelongsTo(() => Blob)
  blob: Blob;

  @ForeignKey(() => Test)
  @Column
  test_id: number;

  @BelongsTo(() => Test)
  test: Test;

  @HasMany(() => Answer)
  answers: Answer[]
}