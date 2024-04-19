import CreateAnswerDto from "./create-answer.dto";

export default class CreateQuestionDto {
  text: string;
  blob_id: number;
  test_id: number;
  score: number;
  answers: Array<CreateAnswerDto>
}