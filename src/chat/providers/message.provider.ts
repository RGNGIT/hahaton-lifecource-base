
import constants from "../../common/constants";
import { Message } from "../entities/chat.entity";

export const messageProvider = [
  {
    provide: constants.MESSAGES_REPOSITORY,
    useValue: Message,
  }
];