import { ApiProperty } from "@nestjs/swagger";

export class CreateVacancyDto {
  @ApiProperty()
  header: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  organization_id:number;
}