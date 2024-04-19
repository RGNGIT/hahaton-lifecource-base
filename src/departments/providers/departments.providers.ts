import constants from "../../common/constants";
import { Department } from "../entities/department.entity";

export const departmentProvider = [
  {
    provide: constants.DEPARTMENT_REPOSITORY,
    useValue: Department,
  },
];