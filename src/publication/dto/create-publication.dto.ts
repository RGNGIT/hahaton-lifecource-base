import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePublicationDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    section: string;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    author_id: number;
    @ApiPropertyOptional()
    university_id: number;
    @ApiPropertyOptional()
    tags?: Array<string>;
}
