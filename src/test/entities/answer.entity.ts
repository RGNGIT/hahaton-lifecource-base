import {Model, BelongsTo, Column, Table, ForeignKey } from "sequelize-typescript";
import { Question } from "./question.entity";

@Table
export class Answer extends Model {
  @Column
  text: string;

  @Column
  is_correct: boolean;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @BelongsTo(() => Question)
  question: Question;
}