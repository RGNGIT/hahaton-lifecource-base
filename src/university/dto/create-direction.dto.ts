import { GraduateLevel } from "src/common/enums/graduate_level.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDirectionDto {

    @ApiProperty()
    fullname: string;
    @ApiPropertyOptional()
    shortname?: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiProperty()
    department_id: number;
    @ApiPropertyOptional()
    graduate_level?: GraduateLevel;
}
