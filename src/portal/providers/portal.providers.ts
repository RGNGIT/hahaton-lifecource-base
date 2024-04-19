import { Portal } from "../entities/portal.entity";
import constants from "../../common/constants";

export const portalProvider = [
  {
    provide: constants.PORTAL_REPOSITORY,
    useValue: Portal,
  },
];