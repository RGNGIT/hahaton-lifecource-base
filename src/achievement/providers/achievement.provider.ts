
import constants from "../../common/constants";
import { Appeal } from "../entities/appeal.entity";
import { Achievement } from "../entities/achievement.entity";

export const achievementProvider = [
  {
    provide: constants.ACHIEVEMENTS_REPOSITORY,
    useValue: Achievement,
  },
  {
    provide: constants.APPEALS_REPOSITORY,
    useValue: Appeal,
  }
];