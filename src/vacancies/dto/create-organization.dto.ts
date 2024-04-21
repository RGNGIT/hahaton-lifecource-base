import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOrganizationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  short_name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  INN: string;
  @ApiProperty()
  OGRN: string;
  @ApiPropertyOptional()
  photo: string;
  @ApiProperty()
  locality_id: number;
  @ApiProperty()
  owner_id: number;
}