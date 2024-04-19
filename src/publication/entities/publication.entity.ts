import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Blob } from "src/cdn/entities/blob.entity";
import { User } from "src/user/entities/user.entity";
import { Comment } from "./comments.entity";

@Table
export class Publication extends Model{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    title: string;

    @Column
    content: string;

    @Column({type: DataType.JSON})
    fileKeys: string[];

    @Column
    date: Date;

    @ForeignKey(() => User)
    author_id: number;
  
    @BelongsTo(() => User, 'author_id')
    author: User;

    @Column({type: DataType.JSON})
    tags: string[];

    @Column({defaultValue: 0})
    likes: number; 
    // @HasMany(() => Blob)
    // blobs: Blob[];

    @HasMany(()=>Comment)
    comments: Comment[];
}
