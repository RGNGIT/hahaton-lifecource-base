import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from './create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { EmployeeStatuses } from 'src/common/enums/employee_statuses.enum';

export default class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  first_name?: string;
  @ApiPropertyOptional()
  last_name?: string;
  @ApiPropertyOptional()
  middle_name?: string;
  @ApiPropertyOptional()
  birthdate?: Date;
  @ApiPropertyOptional()
  phone?: string;
  @ApiPropertyOptional()
  portal_id?: number;
  @ApiPropertyOptional()
  department_id?: number;
  @ApiPropertyOptional()
  position_id?: number;
  @ApiPropertyOptional()
  status?: EmployeeStatuses;

  avatar_salt: string;
}