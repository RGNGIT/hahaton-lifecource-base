import { Model, Column, HasMany, Table } from "sequelize-typescript";
import { Department } from "src/departments/entities/department.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class Portal extends Model {
  @Column
  name: string;

  @Column({ allowNull: true })
  description?: string;

  @Column
  TIN: string;

  @Column
  address: string;

  @Column
  org_name: string;

  @Column({ allowNull: true })
  logo_url?: string;

  @HasMany(() => Department)
  departments: Department[];

  @HasMany(() => User)
  users: User[]
}
