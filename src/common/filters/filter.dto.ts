import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional, ValidateNested, IsString, IsArray } from 'class-validator';

class FilterCriteriaDto {
  @IsOptional()
  operator: string;

  @IsOptional()
  value: any;
}

class SortCriteria {
    @IsString()
    field: string;
  
    @IsString()
    order: string;
  }

class FilterFieldsDto {
  [key: string]: FilterCriteriaDto;
}

export class FilterDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterFieldsDto)
  fields: FilterFieldsDto;

  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(1)
  pageSize: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortCriteria)
  sort: SortCriteria[];

  @IsOptional()
  sortOrder: string;
}
