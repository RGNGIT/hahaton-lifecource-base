import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany } from "sequelize-typescript";
import { University } from "./university.entity";
import { Department } from "./department.entity";

@Table
export class Faculty extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    fullname: string;

    @Column
    shortname: string;

    @Column
    description: string;

    @ForeignKey(() => University)
    @Column
    university_id: number;
  
    @BelongsTo(() => University)
    university: University;

    @HasMany(()=>Department)
    depaetments: Department[];
}
