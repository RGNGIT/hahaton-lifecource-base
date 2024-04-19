import constants from "../../common/constants";
import { Invitation } from "../entities/invitation.entity";

export const invitationProvider = [
  {
    provide: constants.INVITATION_REPOSITORY,
    useValue: Invitation,
  },
];