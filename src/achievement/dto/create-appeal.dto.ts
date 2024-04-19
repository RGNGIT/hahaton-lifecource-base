import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAppealDto {
    @ApiProperty()
    text: string;
    @ApiPropertyOptional()
    user_id?: number;
    @ApiPropertyOptional()
    event_id?: number;
}
