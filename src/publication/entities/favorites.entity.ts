import { Model, Column, DataType, Table, BelongsToMany, ForeignKey, CreatedAt } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { Publication } from "./publication.entity";



@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class Favorites extends Model<Favorites> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ForeignKey(() => Publication)
  @Column({ type: DataType.INTEGER })
  publication_id: number;
}