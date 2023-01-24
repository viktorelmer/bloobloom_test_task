export interface ICollection {
  configuration_name: string;
  id: number;
  name: string;
}

export enum FiltersType {
  COLOUR = "COLOUR",
  SHAPE = "SHAPE",
}

export type Filters = {
  [key: string]: string[];
};
