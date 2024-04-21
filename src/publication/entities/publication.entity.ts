import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { Comment } from "./comments.entity";
import { University } from "src/university/entities/university.entity";
import { Favorites } from "./favorites.entity";

@Table
export class Publication extends Model{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    title: string;

    @Column
    content: string;

    @Column
    section: string;

    @Column({type: DataType.JSON})
    file_keys: string[];

    @ForeignKey(() => User)
    author_id: number;
  
    @BelongsTo(() => User, 'author_id')
    author: User;

    @Column({type: DataType.JSON})
    tags: string[];

    @Column({defaultValue: 0})
    likes: number; 

    @HasMany(()=>Comment)
    comments: Comment[];

    @ForeignKey(() => User)
    university_id: number;
  
    @BelongsTo(() => University, 'university_id')
    university: University;

    @BelongsToMany(() => User, () => Favorites)
    users: Favorites[];
  
}
