import { Model, Column, DataType, Table, BelongsToMany, ForeignKey, CreatedAt } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { Group } from "./group.entity";


@Table({ tableName: 'students', createdAt: false, updatedAt: false })
export class Students extends Model<Students> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER })
  group_id: string;
}