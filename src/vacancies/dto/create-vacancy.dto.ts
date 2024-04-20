import { ApiProperty } from "@nestjs/swagger";

export class CreateVacancyDto {
  @ApiProperty()
  header: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  author_id: number;
  @ApiProperty()
  locality_id: number;
  @ApiProperty()
  organization_id:number;
}