import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany } from "sequelize-typescript";
import { Faculty } from "./faculty.entity";
import { Direction } from "./direction.entity";


@Table
export class Department extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    fullname: string;

    @Column
    shortname: string;

    @Column
    description: string;

    @ForeignKey(() => Faculty)
    @Column
    faculty_id: number;
  
    @BelongsTo(() => Faculty)
    faculty: Faculty;

    @HasMany(()=>Direction)
    directions: Direction[];
}
