import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    text: string;
    @ApiProperty()
    publication_id: number;
    @ApiProperty()
    user_id: number;
}
