import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class CreateUserDto {
  @ApiProperty()
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  @ApiProperty()
  password: string;
}