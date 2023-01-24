<template>
  <div class="top-header">
    <div
      class="top-header-side-bar-button"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
    >
      MENU
    </div>
  </div>
  <div class="grid-menu-header bottom-header">
    <div></div>
    <div class="header-title">{{ collectionTitle.toUpperCase() }}</div>
    <div
      v-for="(item, key) in filtersConfig"
      :key="key"
      class="header-config"
      :class="{ active_config: activeConfigMenu === key }"
      :onClick="
        () => {
          openConfigMenu(key as string);
        }
      "
    >
      {{ key }}
    </div>
  </div>
  <SideBar
    :sidebar_items="sideBarData"
    :isDisplay="shouldDisplaySidebar"
    :closeSidebar="closeSidebar"
  />
  <ConfigMenu
    v-if="activeConfigMenu"
    :status="!!activeConfigMenu"
    :type="activeConfigMenu"
    :items="filtersConfig[activeConfigMenu]"
  />
</template>
<script lang="ts">
import ConfigMenu from "./ConfigMenu.vue";
import SideBar from "./SideBar.vue";

import { FILTERS_CONFIG } from "@/exports/constants";
import { storeToRefs } from "pinia";
import { useCollectionStore } from "@/stores/collectionStore";

import { watch } from "vue";

export default {
  props: {
    sideBarData: Object,
  },
  components: {
    SideBar,
    ConfigMenu,
  },
  data(): {
    shouldDisplaySidebar: boolean;
    filtersConfig: { [key: string]: any };
    activeConfigMenu: string | null;
    collectionTitle: string;
  } {
    return {
      shouldDisplaySidebar: false,
      filtersConfig: FILTERS_CONFIG,
      activeConfigMenu: null,
      collectionTitle: "",
    };
  },
  async mounted() {
    const collection = useCollectionStore();
    const { selectedCollection, collections } = storeToRefs(collection);

    // set inital amount of loaded after change collection
    watch([collections, selectedCollection], () => {
      this.collectionTitle =
        collections.value?.find(
          (el) => el.configuration_name === selectedCollection.value
        )?.name || "";
    });
  },
  methods: {
    openConfigMenu: function (key: string) {
      if (this.activeConfigMenu === key) {
        this.activeConfigMenu = null;
      } else this.activeConfigMenu = key;
    },
    closeSidebar: function () {
      this.shouldDisplaySidebar = false;
    },
    handleMouseOver: function () {
      this.shouldDisplaySidebar = true;
    },
    handleMouseLeave: function (e: any) {
      // if hover mouse outed of browser window or hovered item not side-bar close side-bar
      if (!e.relatedTarget || e.relatedTarget.className !== "side-bar_item") {
        this.shouldDisplaySidebar = false;
      }
    },
  },
};
</script>
<style>
.bottom-header {
  border: 1px solid black;
  border-bottom: none;
  width: 100%;
}

.header-title {
  padding: 5px 15px;
  border: 1px solid black;
  border-top: none;
  border-bottom: none;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}

.top-header {
  width: 100%;
}

.top-header-side-bar-button {
  width: fit-content;
  display: flex;
  cursor: pointer;
  padding: 15px 10px;
}

.top-header-side-bar-button:hover {
  text-decoration: underline;
  user-select: none;
}
</style>
