<template>
  <div v-if="status === true" class="config-menu">
    <div v-for="(item, key) in items" :key="key" class="config-menu-item">
      <input
        type="checkbox"
        :id="key + ''"
        :value="item"
        :checked="
          selectedFilters && type
            ? !!selectedFilters[type]?.find((el) => el === item)
            : false
        "
        @change="onSelect($event)"
      />
      <label for="track">{{ item }}</label
      ><br />
    </div>
  </div>
</template>
<script lang="ts">
import { useCollectionStore } from "@/stores/collectionStore";
import type { Filters } from "@/exports/types";
import { storeToRefs } from "pinia";
import { watch } from "vue";

export default {
  props: {
    items: Array,
    status: Boolean,
    type: String,
  },
  data(): {
    configList: string[];
    selectedFilters: { [key: string]: string[] } | null;
  } {
    return {
      configList: [],
      selectedFilters: null,
    };
  },
  async mounted() {
    const collection = useCollectionStore();
    const { selectedFilters } = storeToRefs(collection);

    // set inital amount of loaded after change collection
    watch(selectedFilters, (data) => {
      this.selectedFilters = data;
    });
  },
  methods: {
    onSelect(e: any) {
      if (this.type) {
        const collection = useCollectionStore();
        const filters = collection.selectedFilters;
        if (!filters && e.target.checked) {
          const newFilter: Filters = {
            [this.type]: [e.target.defaultValue],
          };
          collection.setFilters(newFilter);
        } else if (filters) {
          let newFilter = filters[this.type] || [];
          if (!e.target.checked) {
            newFilter = newFilter.filter((el) => el !== e.target.defaultValue);
          } else {
            newFilter = [...newFilter, e.target.defaultValue];
          }
          collection.setFilters({ ...filters, [this.type]: newFilter });
        }
      }
    },
  },
};
</script>
<style>
.config-menu {
  padding: 10px 15px;
  border: 1px solid black;
  border-bottom: none;
  display: flex;
  flex-wrap: wrap;
}

.config-menu > div {
  margin: 0 10px;
}
.config-menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.config-menu-item > label {
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
