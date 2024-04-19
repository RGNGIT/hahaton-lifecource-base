import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Role } from '../../role/entities/role.entity';
import { UserRoles } from './user-roles.entity';
import { Locality } from 'src/localities/entities/locality.entity';
import { Appeal } from 'src/achievement/entities/appeal.entity';
import { Group } from 'src/university/entities/group.entity';
import { Students } from 'src/university/entities/students.entity';
import { Participants } from 'src/event/entities/participants.entity';
import { Event } from 'src/event/entities/event.entity';
import { Admins } from 'src/university/entities/admins.entity';
import { University } from 'src/university/entities/university.entity';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { Sex } from 'src/common/enums/sex.enum';

@Table
export class User extends Model {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  avatar_salt: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  middle_name: string;

  @Column
  sex: Sex;

  @Column
  phone: string;

  @Column
  birthdate: Date;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Group, () => Students)
  groups: Group[];

  @BelongsToMany(() => University, () => Admins)
  universities: University[];

  @BelongsToMany(() => Event, () => Participants)
  events: Event[];

  @Column
  email: string;

  @Column
  password: string;

  // @Column({ defaultValue: Rates.single })
  // rate: Rates

  @ForeignKey(() => Locality)
  @Column
  locality_id: number;

  @BelongsTo(() => Locality)
  locality: Locality;

  @HasMany(() => Appeal, 'applicant_id')
  appeals: Appeal[];

  @HasMany(() => Achievement, 'user_id')
  achievements: Achievement[];

}

