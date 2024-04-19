import constants from "../../common/constants";
import { HrAnswer } from "../entities/hr_answer.entity";

export const hrAppealProvider = [
  {
    provide: constants.HRANSWERS_REPOSITORY,
    useValue: HrAnswer,
  },
];