import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { University } from "src/university/entities/university.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class UserContent extends Model {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  content_salt: string;

  @ForeignKey(() => User)
  @Column
  author_id: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => University)
  @Column
  university_id: number;

  @BelongsTo(() => University)
  university: University;
}
