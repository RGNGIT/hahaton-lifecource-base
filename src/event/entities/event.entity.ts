import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { EventSection } from "src/common/enums/event_section.enum";
import { University } from "src/university/entities/university.entity";
import { User } from "src/user/entities/user.entity";
import { Participants } from "./participants.entity";
import { Achievement } from "src/achievement/entities/achievement.entity";

@Table
export class Event extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    date_beg: Date;

    @Column
    date_end: Date;

    @Column({defaultValue: EventSection.none})
    section: EventSection;

    @ForeignKey(() => University)
    @Column
    university_id: number;
  
    @BelongsTo(() => University)
    university: University;

    @BelongsToMany(() => User, () => Participants)
    participants: User[];

    @HasMany(()=>Achievement)
    achievements: Achievement[];
}
