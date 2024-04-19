import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDepartmentDto {

    @ApiProperty()
    fullname: string;
    @ApiPropertyOptional()
    shortname?: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiProperty()
    faculty_id: number;
}
