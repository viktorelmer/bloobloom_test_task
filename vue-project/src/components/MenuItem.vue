<template>
  <span class="menu-item-title">{{ item_title.toUpperCase() }}</span>
  <img class="menu-item-image" :src="item_img" />
</template>
<style>
.menu-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.menu-item-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
  z-index: 10;
  text-align: center;
}

.menu-item-image {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  props: ["item_title", "item_img"],
};
</script>
