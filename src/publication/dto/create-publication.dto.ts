import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePublicationDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    author_id: number;
    @ApiPropertyOptional()
    tags?: Array<string>;
}
