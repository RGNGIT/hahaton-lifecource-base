import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Portal } from "src/portal/entities/portal.entity";
import { Topic } from "src/topic/entities/topic.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class Department extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @ForeignKey(() => Portal)
  @Column
  portal_id: number;

  @BelongsTo(() => Portal)
  portal: Portal;

  @ForeignKey(() => Department)
  @Column({ allowNull: true })
  parent_department_id?: number;

  @BelongsTo(() => Department)
  parent_department: Department;

  @HasMany(() => Department)
  child_departments: Department[];

  @HasMany(() => Topic)
  topic: Topic[];

  @HasMany(() => User)
  users: User[];

}

