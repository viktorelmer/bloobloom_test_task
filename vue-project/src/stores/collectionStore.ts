import { defineStore } from "pinia";
import { DEFAULT_SELECTED_COLLECTION, INITIAL_PAGE } from "@/exports/constants";
import { getCollections, loadPositions } from "@/exports/utils";
import type { Filters, ICollection } from "@/exports/types";

interface ICollectionStore {
  selectedCollection: string;
  collections: ICollection[] | null;
  positions: any;
  isAllLoaded: boolean;
  selectedFilters: Filters | null;
  isLoading: boolean;
}

export const useCollectionStore = defineStore("counter", {
  state: (): ICollectionStore => {
    return {
      selectedCollection: DEFAULT_SELECTED_COLLECTION,
      collections: null,
      positions: null,
      isAllLoaded: false,
      selectedFilters: null,
      isLoading: false,
    };
  },
  actions: {
    async setFilters(filter: Filters) {
      this.selectedFilters = filter;
      this.setCollection(this.selectedCollection);
    },
    async loadCollection() {
      this.collections = await getCollections();
    },
    async setCollection(newCollection: string) {
      this.selectedCollection = newCollection;
      const glasses = await loadPositions(
        newCollection,
        INITIAL_PAGE,
        this.selectedFilters
      );
      this.positions = glasses;
      this.isAllLoaded = false;
    },
    async loadMorePositions(pageNumber: number) {
      if (!this.isAllLoaded) {
        this.isLoading = true;
        const glasses = await loadPositions(
          this.selectedCollection,
          pageNumber,
          this.selectedFilters
        );
        if (glasses.length) {
          this.positions = [...this.positions, ...glasses];
        } else {
          this.isAllLoaded = true;
        }
        this.isLoading = false;
      }
    },
  },
});
