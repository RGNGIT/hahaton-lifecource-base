import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class CreateUserContentDto {
  @ApiProperty()
  content_salt: string;
  @ApiProperty()
  author_id: number;
}
