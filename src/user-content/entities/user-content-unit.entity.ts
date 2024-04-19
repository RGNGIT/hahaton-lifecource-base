import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
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
}
