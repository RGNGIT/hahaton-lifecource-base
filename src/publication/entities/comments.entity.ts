
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Publication } from "./publication.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class Comment extends Model{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    text: string;


    @ForeignKey(() => Publication)
    publication_id: number;
  
    @BelongsTo(() => Publication, 'publication_id')
    publication: Publication;

    @ForeignKey(() => User)
    user_id: number;
  
    @BelongsTo(() => User, 'user_id')
    user: User;

}