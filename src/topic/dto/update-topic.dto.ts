import { PartialType } from '@nestjs/mapped-types';
import CreateTopicDto from './create-topic.dto';

export default class UpdateTopicDto extends PartialType(CreateTopicDto) {
  blob_id: string;
  department_id: string;
}