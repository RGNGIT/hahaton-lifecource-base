import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateFacultyDto {
    @ApiProperty()
    fullname: string;
    @ApiPropertyOptional()
    shortname?: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiProperty()
    university_id: number;
}
