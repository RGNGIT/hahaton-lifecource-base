import { Table, Column, Model, BelongsToMany, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Role } from '../../role/entities/role.entity';
import { UserRoles } from './user-roles.entity';
import { Locality } from 'src/localities/entities/locality.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Portal } from 'src/portal/entities/portal.entity';
import { EmployeeStatuses } from 'src/common/enums/employee_statuses.enum';
import { Rates } from 'src/common/enums/rates.enum';
import { Appeal } from 'src/achievement/entities/appeal.entity';
import { TestResult } from 'src/test/entities/test-results.entity';
import { Group } from 'src/university/entities/group.entity';
import { Students } from 'src/university/entities/students.entity';
import { Participants } from 'src/event/entities/participants.entity';
import { Event } from 'src/event/entities/event.entity';
import { Admins } from 'src/university/entities/admins.entity';
import { University } from 'src/university/entities/university.entity';
import { Achievement } from 'src/achievement/entities/achievement.entity';

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

  // @Column({ defaultValue: EmployeeStatuses.active })
  // status: EmployeeStatuses;

  // @ForeignKey(() => Department)
  // @Column
  // department_id: number;

  // @BelongsTo(() => Department)
  // department: Department;

  @ForeignKey(() => Locality)
  @Column
  locality_id: number;

  @BelongsTo(() => Locality)
  locality: Locality;

  // @ForeignKey(() => Portal)
  // @Column
  // portal_id: number;

  // @BelongsTo(() => Portal)
  // portal: Portal;

  @HasMany(() => Appeal, 'applicant_id')
  appeals: Appeal[];

  @HasMany(() => Achievement, 'user_id')
  achievements: Achievement[];

  // @HasMany(() => Appeal, 'hr_id')
  // requests: Appeal[];

  // @HasMany(() => TestResult)
  // test_results: TestResult[];
}

