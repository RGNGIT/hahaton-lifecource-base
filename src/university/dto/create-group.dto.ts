import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateGroupDto {
    @ApiProperty()
    fullname: string;
    @ApiPropertyOptional()
    shortname?: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiProperty()
    direction_id: number;
}
