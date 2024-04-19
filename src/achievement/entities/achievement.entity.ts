import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Appeal } from "src/achievement/entities/appeal.entity";
import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class Achievement extends Model {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    value: string;

    @Column
    date: Date;


    @ForeignKey(() => User)
    user_id: number;
  
    @BelongsTo(() => User, 'user_id')
    user: User;

    @ForeignKey(() => Appeal)
    appeal_id: number;
  
    @BelongsTo(() => Appeal, 'appeal_id')
    appeal: Appeal;
    
    @ForeignKey(() => Event)
    event_id: number;

    @BelongsTo(() => Event, 'event_id')
    event: Event;

    
}
