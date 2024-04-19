
import constants from "../../common/constants";
import { Participants } from "../entities/participants.entity";


export const eventProvider = [
  {
    provide: constants.EVENT_REPOSITORY,
    useValue: Event,
  },
  {
    provide: constants.PARTICIPANTS_REPOSITORY,
    useValue: Participants,
  }
];