import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUniversityDto {
    @ApiProperty()
    fullname: string;
    @ApiPropertyOptional()
    shortname?: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiPropertyOptional()
    address?: string;
    @ApiProperty()
    locality_id: number;
}
