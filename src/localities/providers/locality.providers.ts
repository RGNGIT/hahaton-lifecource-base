import { Locality } from "../entities/locality.entity";
import constants from "../../common/constants";

export const localityProvider = [
  {
    provide: constants.LOCALITY_REPOSITORY,
    useValue: Locality,
  },
];