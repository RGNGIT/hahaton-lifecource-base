import { Model, Column, DataType, Table, BelongsToMany, ForeignKey, CreatedAt } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { University } from "./university.entity";


@Table({ tableName: 'admins', createdAt: false, updatedAt: false })
export class Admins extends Model<Admins> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: string;

  @ForeignKey(() => University)
  @Column({ type: DataType.INTEGER })
  university_id: string;
}