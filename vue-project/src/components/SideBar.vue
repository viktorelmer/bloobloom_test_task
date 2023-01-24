<template>
  <div
    class="side-bar"
    :class="{ active: isDisplay }"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="side-bar_item"
      v-for="(value, key) in sidebar_items"
      :key="key"
      @mouseover="hoveredItem = key"
      @mouseleave="hoveredItem = null"
      @click="handleSidebarItemClick(value)"
    >
      <div 
        class="side-bar_item_title"
        :class="{show_arrow: typeof value === 'object'}"
      >
        {{ key.toUpperCase() }}
      </div>

      <!-- Sub items for side bar item -->
      <SideBar
        v-if="typeof value !== 'string'"
        :sidebar_items="value"
        :isDisplay="hoveredItem === key"
        :closeSidebar="closeSubSidebar"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useCollectionStore } from "@/stores/collectionStore";

export default {
  name: "side-bar",
  props: {
    sidebar_items: Object,
    isDisplay: Boolean,
    closeSidebar: Function,
  },
  data(): {
    hoveredItem: string | null;
  } {
    return {
      hoveredItem: null,
    };
  },
  methods: {
    handleSidebarItemClick: function (itemKey: string | object) {
      if (typeof itemKey === "string") {
        const collection = useCollectionStore();
        collection.setCollection(itemKey);
      }
    },
    // handle close sub sidebar item on leave parent item
    closeSubSidebar: function () {
      this.hoveredItem = null;
    },
    // handle leave mouse from sidebar component
    handleMouseLeave: function (e: any) {
      if (
        !e.relatedTarget ||
        e.relatedTarget.className !== "top-header-side-bar-button" // if hovered target is "MENU" button, side-bire shouldn't be closed
      ) {
        this.closeSidebar && this.closeSidebar();
      }
    },
  },
};
</script>

<style>
.side-bar {
  z-index: 100;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  position: absolute;
  background: white;
  top: 48px;
  height: calc(100vh - 52.5px);
  transform: translateX(-200px);
}

.active {
  background: white;
  z-index: 100;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transform: translateX(0px);
}

.show_arrow::after {
  content: ">";
}

.side-bar_item {
  display: flex;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  background: white;
  padding: 10.7px 15px;
  border: 1px solid black;
  border-bottom: none;
  width: 200px;
  color: black;
}

.side-bar_item:hover {
  background: black;
  color: white;
}

.side-bar_item:last-child {
  border: 1px solid black;
}

.side-bar_item > .side-bar {
  z-index: -1 !important;
  background: white;
  top: 0 !important;
  transform: translateX(-250px) !important;
  position: absolute;
  display: none;
}

.side-bar_item > .active {
  z-index: -1 !important;
  background: white;
  transform: translateX(183px) !important;
  display: block;
}

.side-bar_item_title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
