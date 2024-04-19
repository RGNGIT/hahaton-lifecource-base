import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAchievementDto {
    @ApiProperty()
    value: string;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    appeal_id: number;
    @ApiProperty()
    event_id: number;
}
