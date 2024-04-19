import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'


export class CreateRegionDto {
  @ApiProperty()
  readonly name: string;
}
