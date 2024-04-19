
import constants from "../../common/constants";
import { Comment } from "../entities/comments.entity";
import { Favorites } from "../entities/favorites.entity";
import { Publication } from "../entities/publication.entity";


export const publicationProvider = [
  {
    provide: constants.PUBLICATION_REPOSITORY,
    useValue: Publication,
  },
  {
    provide: constants.COMMENTS_REPOSITORY,
    useValue: Comment,
  },
  {
    provide: constants.FAVORITES_REPOSITORY,
    useValue: Favorites,
  }
];