import { FiltersType } from "./types";

export const API_URL_MASK =
  "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections";

export const GLASS_ENPOINT =
  API_URL_MASK +
  "/spectacles-women/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=coloured&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=round&filters[frame_variant_home_trial_available]=false";

export const DEFAULT_SELECTED_COLLECTION = "spectacles-women";

export const INITIAL_PAGE = 1;

export const FILTERS_CONFIG = {
  COLOUR: ["black", "tortoise", "coloured", "crystal", "dark", "bright"],
  SHAPE: ["square", "rectangle", "round", "cat-eye"],
};

export const FILTER_LINES = {
  [FiltersType.COLOUR]:
    "filters[glass_variant_frame_variant_colour_tag_configuration_names][]",
  [FiltersType.SHAPE]:
    "filters[glass_variant_frame_variant_frame_tag_configuration_names][]",
};
