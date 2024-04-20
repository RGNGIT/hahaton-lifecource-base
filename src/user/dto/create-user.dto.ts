import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class CreateUserDto {
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiPropertyOptional()
  middle_name?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  locality_id: number;
  group_id: number;
  is_admin: boolean;
}