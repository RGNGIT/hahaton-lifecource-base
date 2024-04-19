import { Model, Column, DataType, Table, BelongsToMany, ForeignKey, CreatedAt } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

import { Event } from "./event.entity";


@Table({ tableName: 'participants', createdAt: false, updatedAt: false })
export class Participants extends Model<Participants> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER })
  event_id: string;
}