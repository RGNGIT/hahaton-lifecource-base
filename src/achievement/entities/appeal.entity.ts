import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Achievement } from "src/achievement/entities/achievement.entity";
import { AppealStatus } from "src/common/enums/appeal_status.enum";
import { Event } from "src/event/entities/event.entity";
import { HrAnswer } from "src/hr_answer/entities/hr_answer.entity";
import { User } from "src/user/entities/user.entity";


@Table
export class Appeal extends Model {
  
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  text: string;

  @Column({ defaultValue: AppealStatus.new })
  status: AppealStatus;

  @ForeignKey(() => User)
  applicant_id: number;

  @BelongsTo(() => User, 'applicant_id')
  applicant: User;

  @ForeignKey(() => Event)
  event_id: number;

  @BelongsTo(() => Event, 'event_id')
  event: Event;

  @HasOne(()=>Achievement)
  achievement: Achievement;

}