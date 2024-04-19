import { Model } from "sequelize";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { InviteStatus } from "src/common/enums/invite_status.enum";
import { User } from "src/user/entities/user.entity";

@Table
export class Invitation extends Model {
  @Column
  room_num: string;

  @Column
  datetime: Date;

  @Column
  Instructions: string;

  @Column
  url: string;

  @Column({ defaultValue: InviteStatus.new })
  status: InviteStatus

  @ForeignKey(() => User)
  @Column
  recipient_id: number;

  @BelongsTo(() => User)
  user: User

}
