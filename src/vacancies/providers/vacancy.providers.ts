import { Vacancy } from "../entities/vacancy.entity";
import { UserVacancies } from "../entities/vacancy-user.entity";
import constants from "../../common/constants";

export const vacancyProvider = [
  {
    provide: constants.VACANCIES_REPOSITORY,
    useValue: Vacancy,
  },
  {
    provide: constants.USER_VACANCIES_REPOSITORY,
    useValue: UserVacancies,
  }
];