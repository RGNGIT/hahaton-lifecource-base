import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class FriendDto {
  @ApiProperty()
  user_one: number;
  @ApiProperty()
  user_two: number;
}