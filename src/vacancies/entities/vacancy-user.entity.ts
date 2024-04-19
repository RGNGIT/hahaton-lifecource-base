import { Model, Column, DataType, Table, BelongsToMany, ForeignKey, CreatedAt } from "sequelize-typescript";
import { Vacancy } from "./vacancy.entity";
import { User } from "src/user/entities/user.entity";

@Table({ tableName: 'user_vacancies', createdAt: false, updatedAt: false })
export class UserVacancies extends Model<UserVacancies> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Vacancy)
  @Column({ type: DataType.INTEGER })
  vacancyId: number;
}