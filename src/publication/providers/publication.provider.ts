
import constants from "../../common/constants";
import { Publication } from "../entities/publication.entity";


export const publicationProvider = [
  {
    provide: constants.PUBLICATION_REPOSITORY,
    useValue: Publication,
  }
];