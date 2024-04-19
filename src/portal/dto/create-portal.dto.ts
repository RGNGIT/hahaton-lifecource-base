import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePortalDto {
  @ApiProperty()
  readonly name: string;
  @ApiPropertyOptional()
  readonly description?: string;
  @ApiProperty()
  readonly TIN: string;
  readonly address: string;
  readonly org_name: string;
  readonly admin_id: number;
}
