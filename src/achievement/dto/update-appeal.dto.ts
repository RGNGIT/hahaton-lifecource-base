import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppealDto } from './create-appeal.dto';
import { AppealStatus } from 'src/common/enums/appeal_status.enum';

export class UpdateAppealDto extends PartialType(CreateAppealDto) {
    @ApiProperty()
    status: AppealStatus;
 }
