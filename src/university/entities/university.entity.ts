import { Model, BelongsTo, Column, DataType, ForeignKey, Table, HasMany, BelongsToMany } from "sequelize-typescript";
import { Locality } from "src/localities/entities/locality.entity";
import { Faculty } from "./faculty.entity";
import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";
import { Admins } from "./admins.entity";

@Table
export class University extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    fullname: string;

    @Column
    shortname: string;

    @Column
    description: string;

    @Column
    address: string;

    @ForeignKey(() => Locality)
    @Column
    locality_id: number;
  
    @BelongsTo(() => Locality)
    locality: Locality;

    @HasMany(()=>Faculty)
    faculties: Faculty[];
  
    @HasMany(()=>Event)
    events: Event[];

    @BelongsToMany(() => User, () => Admins)
    admins: User[]
}
