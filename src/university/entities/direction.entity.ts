
import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany } from "sequelize-typescript";
import { Faculty } from "./faculty.entity";
import { Department } from "./department.entity";
import { Group } from "./group.entity";
import { GraduateLevel } from "src/common/enums/graduate_level.enum";

@Table
export class Direction extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    fullname: string;

    @Column
    shortname: string;

    @Column
    description: string;

    @ForeignKey(() => Department)
    @Column
    department_id: number;
  
    @BelongsTo(() => Department)
    department: Department;

    @HasMany(()=>Group)
    groups: Group[];

    @Column({defaultValue: GraduateLevel.none})
    graduate_level: GraduateLevel;
}
