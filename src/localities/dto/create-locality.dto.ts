import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'


export class CreateLocalityDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  region_id: number;
}
