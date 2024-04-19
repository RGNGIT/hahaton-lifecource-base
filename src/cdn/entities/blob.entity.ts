import { Model, Column, HasMany, Table } from "sequelize-typescript";
import { Question } from "src/test/entities/question.entity";
import { Topic } from "src/topic/entities/topic.entity";

@Table
export class Blob extends Model {
  @Column
  key: string;

  @HasMany(() => Topic)
  topics: Topic[];

  @HasMany(() => Question)
  questions: Question[];
}