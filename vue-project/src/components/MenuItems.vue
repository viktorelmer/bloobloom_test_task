<template>
  <div class="grid-menu items-container" id="menu-items" ref="scrollComponent">
    <div v-for="item in items" :key="item.id" class="menu-item">
      <MenuItem
        :item_title="item.name"
        :item_img="item?.glass_variants[0].media[0]?.url"
      />
    </div>
  </div>
</template>
<script lang="ts">
import MenuItem from "./MenuItem.vue";
import { watch } from "vue";
import { useCollectionStore } from "@/stores/collectionStore";
import { storeToRefs } from "pinia";

export default {
  name: "menu-items",
  components: {
    MenuItem,
  },
  data(): { items: any[] | null; page: number } {
    return {
      items: null,
      page: 1,
    };
  },
  methods: {
    handleScroll() {
      const element = this.$refs.scrollComponent as Element;
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        this.page += 1;
        const collection = useCollectionStore();
        collection.loadMorePositions(this.page);
      }
    },
  },
  async mounted() {
    const collection = useCollectionStore();
    const { positions, selectedCollection, selectedFilters } =
      storeToRefs(collection);

    // set inital amount of loaded after change collection
    watch(selectedCollection, () => {
      this.page = 1;
    });

    watch(selectedFilters, () => {
      this.page = 1;
    });

    watch(positions, (data) => {
      this.items = data;
    });

    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style>
.items-container {
  border-top: 1px solid black;
  width: 100%;
  justify-items: center;
  align-items: flex-start;
}
</style>
