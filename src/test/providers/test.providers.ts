import constants from "src/common/constants";
import { Blob } from "src/cdn/entities/blob.entity";
import { Test } from "../entities/test.entity";
import { Question } from "../entities/question.entity";
import { Answer } from "../entities/answer.entity";
import { TestResult } from "../entities/test-results.entity";

export const testProviders = [
  {
    provide: constants.BLOB_REPOSIRORY,
    useValue: Blob
  },
  {
    provide: constants.TEST_REPOSITORY,
    useValue: Test
  },
  {
    provide: constants.QUESTION_REPOSITORY,
    useValue: Question
  },
  {
    provide: constants.ANSWER_REPOSITORY,
    useValue: Answer
  },
  {
    provide: constants.TEST_RESULT_REPOSITORY,
    useValue: TestResult
  },
];