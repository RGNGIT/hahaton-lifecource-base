import { Model, BelongsTo, Column, HasMany, Table, ForeignKey } from "sequelize-typescript";
import { Topic } from "src/topic/entities/topic.entity";
import { Question } from "./question.entity";
import { TestResult } from "./test-results.entity";

@Table
export class Test extends Model {
  @Column
  name: string;

  @ForeignKey(() => Topic)
  @Column
  topic_id: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @HasMany(() => TestResult)
  results: [];

  @HasMany(() => Question)
  answer: Question[]
}