import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany, BelongsToMany } from "sequelize-typescript";
import { Faculty } from "./faculty.entity";
import { Direction } from "./direction.entity";
import { User } from "src/user/entities/user.entity";
import { Students } from "./students.entity";


@Table
export class Group extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    fullname: string;

    @Column
    shortname: string;

    @Column
    description: string;

    @ForeignKey(() => Direction)
    @Column
    direction_id: number;
  
    @BelongsTo(() => Direction)
    direction: Direction;

    @BelongsToMany(() => User, () => Students)
    students: User[]
}
