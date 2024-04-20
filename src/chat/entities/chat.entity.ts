import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table
export class Message extends Model<Message> {
  @Column({type: DataType.TEXT,allowNull: false})
  text: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  sender_id: number;
 

}
