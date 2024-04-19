import { Region } from "../entities/region.entity";
import constants from "../../common/constants";

export const regionProvider = [
  {
    provide: constants.REGION_REPOSITORY,
    useValue: Region,
  },
];