import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAppealDto {
    @ApiProperty()
    text: string;
    @ApiPropertyOptional()
    event_id?: number;
}
