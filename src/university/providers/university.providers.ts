
import constants from "../../common/constants";
import { Department } from "../entities/department.entity";
import { Direction } from "../entities/direction.entity";
import { Faculty } from "../entities/faculty.entity";
import { Group } from "../entities/group.entity";
import { Students } from "../entities/students.entity";
import { University } from "../entities/university.entity";

export const universityProvider = [
  {
    provide: constants.UNIVERSITY_REPOSITORY,
    useValue: University,
  },
  {
    provide: constants.FACULTY_REPOSITORY,
    useValue: Faculty,
  },
  {
    provide: constants.DEPARTMENT_REPOSITORY,
    useValue: Department,
  },
  {
    provide: constants.DIRECTION_REPOSITORY,
    useValue: Direction,
  },
  {
    provide: constants.GROUP_REPOSITORY,
    useValue: Group,
  },
  {
    provide: constants.STUDENTS_REPOSITORY,
    useValue: Students,
  },
];