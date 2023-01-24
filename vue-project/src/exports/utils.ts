import axios from "axios";
import { API_URL_MASK, FILTER_LINES } from "./constants";
import { type ICollection, type Filters, FiltersType } from "./types";

export const getCollections = async (): Promise<ICollection[]> => {
  const {
    data: { collections },
  } = await axios.get(API_URL_MASK);
  return collections;
};

function returnFilterLine(type: FiltersType, param: string): string {
  return `&${FILTER_LINES[type]}=${param}`;
}

export const createFilterParams = (filters: Filters): string => {
  const keys = Object.keys(filters);
  let filterRequestString: string = "";
  for (const key in keys) {
    const filterType = keys[key];
    switch (filterType) {
      case FiltersType.COLOUR:
        for (const pKey in filters[filterType]) {
          const param = filters[filterType][pKey];
          filterRequestString += returnFilterLine(FiltersType.COLOUR, param);
        }
        break;

      case FiltersType.SHAPE:
        for (const pKey in filters[filterType]) {
          const param = filters[filterType][pKey];
          filterRequestString += returnFilterLine(FiltersType.SHAPE, param);
        }
        break;

      default:
        break;
    }
  }
  return filterRequestString;
};

export const getParamsForPositionsRequest = (
  pageNumber: number,
  filters: Filters | null
): string => {
  if (filters) createFilterParams(filters);
  return `sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&page[limit]=12&page[number]=${pageNumber}&filters[frame_variant_home_trial_available]=false${
    filters ? createFilterParams(filters) : ""
  }`;
};

export const loadPositions = async (
  collection: string,
  pageNumber = 1,
  filters: Filters | null
) => {
  const {
    data: { glasses },
  } = await axios.get(
    `${API_URL_MASK}/${collection}/glasses?${getParamsForPositionsRequest(
      pageNumber,
      filters
    )}`
  );
  return glasses;
};
