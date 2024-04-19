import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Blob } from "src/cdn/entities/blob.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class Publication extends Model{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    title: string;

    @Column
    content: string;

    @Column
    date: Date;

    @ForeignKey(() => User)
    author_id: number;
  
    @BelongsTo(() => User, 'author_id')
    author: User;

    // @Column({type: DataType.ARRAY(DataType.JSON), allowNull: false})
    // tags: Array<string>

    // @HasMany(() => Blob)
    // blobs: Blob[];
}
