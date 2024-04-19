import constants from "src/common/constants";
import { UserContent } from "../entities/user-content-unit.entity";

export const userContentProvider = [
    {
      provide: constants.USER_CONTENT_REPOSITORY,
      useValue: UserContent,
    }
]