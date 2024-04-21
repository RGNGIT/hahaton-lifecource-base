import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { Region } from "./region.entity";
import { University } from "src/university/entities/university.entity";
import { Organization } from "src/vacancies/entities/organization.entity";
import { Vacancy } from "src/vacancies/entities/vacancy.entity";


@Table
export class Locality extends Model {
  @Column
  name: string;

  @HasMany(() => User)
  users: User[];

  @ForeignKey(() => Region)
  @Column
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => University)
  universities: University[];

  @HasMany(() => Vacancy)
  vacancies: Vacancy[];

  @HasMany(() => Organization)
  organizations: Organization[];
}
