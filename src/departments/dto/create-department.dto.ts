import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'


export class CreateDepartmentDto {
  @ApiProperty()
  readonly name: string;
  @ApiPropertyOptional()
  readonly description?: string;
  @ApiPropertyOptional()
  readonly parent_department_id?: number;
  @ApiProperty()
  readonly portal_id: number;
  @ApiProperty()
  readonly hr_id: number;
}
