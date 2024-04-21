import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Achievement } from "src/achievement/entities/achievement.entity";
import { AppealStatus } from "src/common/enums/appeal_status.enum";
import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";


@Table
export class Appeal extends Model<Appeal> {
  
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  text: string;

  @Column({ defaultValue: AppealStatus.new })
  status: AppealStatus;

  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @ForeignKey(() => Event)
  event_id: number;

  @BelongsTo(() => Event, 'event_id')
  event: Event;

  @HasOne(()=>Achievement)
  achievement: Achievement;

}