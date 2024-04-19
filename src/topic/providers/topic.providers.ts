import { Blob } from "src/cdn/entities/blob.entity";
import constants from "src/common/constants";
import { Topic } from "../entities/topic.entity";

export const topicProviders = [
  {
    provide: constants.BLOB_REPOSIRORY,
    useValue: Blob
  },
  {
    provide: constants.TOPIC_REPOSITORY,
    useValue: Topic
  }
];