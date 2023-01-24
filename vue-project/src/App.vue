<template>
  <TopHeader :sideBarData="sideBar" />
  <MenuItems />
</template>
<script lang="ts">
import MenuItems from "./components/MenuItems.vue";
import TopHeader from "./components/TopHeader.vue";

import { DEFAULT_SELECTED_COLLECTION } from "./exports/constants";

import { SIDE_BAR } from "./exports/config";
import { useCollectionStore } from "@/stores/collectionStore";
import type { ICollection } from "./exports/types";

export default {
  name: "menu-items",
  components: {
    MenuItems,
    TopHeader,
  },
  data(): {
    selectedCollection: string;
    collections: ICollection[] | null;
    sideBar: any;
  } {
    return {
      selectedCollection: DEFAULT_SELECTED_COLLECTION,
      collections: null,
      sideBar: {},
    };
  },
  async mounted() {
    const collection = useCollectionStore();
    await collection.loadCollection();
    const state = collection.$state;
    collection.setCollection(state.selectedCollection);
    // format collection array to side-bar items
    if (state && state.collections) {
      state.collections.forEach((collectionData) => {
        const [collection, sex] = collectionData.configuration_name.split("-");
        if (!this.sideBar[collection]) {
          this.sideBar[collection] = {
            [sex]: collectionData.configuration_name,
          };
        } else {
          this.sideBar[collection] = {
            ...this.sideBar[collection],
            [sex]: collectionData.configuration_name,
          };
        }
      });
    }
    this.sideBar = { ...this.sideBar, ...SIDE_BAR };
  },
};
</script>
