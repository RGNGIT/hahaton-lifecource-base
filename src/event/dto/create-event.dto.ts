import { EventSection } from "src/common/enums/event_section.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreateEventDto {

    @ApiProperty()
    name: string;
    @ApiPropertyOptional()
    description?: string;
    @ApiProperty()
    date_beg: Date;
    @ApiProperty()
    date_end: Date;
    @ApiPropertyOptional()
    section?: EventSection;
    @ApiProperty()
    university_id: number;
}
