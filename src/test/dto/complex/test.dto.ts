import CreateQuestionDto from "../create-question.dto";
import CreateTestDto from "../create-test.dto";
import { PartialType } from '@nestjs/mapped-types';

export default class TestDto extends PartialType(CreateTestDto) {
  questions: Array<CreateQuestionDto>
}