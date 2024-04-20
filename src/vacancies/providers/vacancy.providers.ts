import { Vacancy } from "../entities/vacancy.entity";
import { UserVacancies } from "../entities/vacancy-user.entity";
import constants from "../../common/constants";
import { Organization } from "../entities/organization.entity";

export const vacancyProvider = [
  {
    provide: constants.VACANCIES_REPOSITORY,
    useValue: Vacancy,
  },
  {
    provide: constants.USER_VACANCIES_REPOSITORY,
    useValue: UserVacancies,
  },
  {
    provide: constants.ORGANIZATIONS_REPOSITORY,
    useValue: Organization,
  }
];