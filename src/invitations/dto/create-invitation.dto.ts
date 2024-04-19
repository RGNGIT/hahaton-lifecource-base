import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateInvitationDto {
  @ApiProperty()
  readonly room_num: string;
  @ApiPropertyOptional()
  readonly Instructions?: string;
  @ApiProperty()
  readonly datetime: Date;
  @ApiPropertyOptional()
  readonly url?: string;
  @ApiProperty()
  readonly recipient_id: number;
}
