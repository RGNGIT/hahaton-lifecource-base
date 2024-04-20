import { Model, Column, DataType, Table, BelongsToMany, ForeignKey, CreatedAt } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";


@Table({ tableName: 'friends', createdAt: false, updatedAt: false })
export class Friends extends Model<Friends> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({field: "user_one", type: DataType.INTEGER })
  user_one_id: number;

  @ForeignKey(() => User)
  @Column({field: "user_two", type: DataType.INTEGER })
  user_two_id: number;
}