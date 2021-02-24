<script>

import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'ButtonFooter',
  props: {
    item: {
      type: Object,
      default() {},
    },
    className: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    dataIndex: {
      type: Number,
      default: () => null,
    },
    dataId: {
      type: Number,
    },
    iconClasses: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    handleClick() {
      console.log(this.item);
      const str = JSON.stringify(this.item);
      console.log(str);
      this.$emit('clicked', str);
    },
    getIsAuthenticated() {
      getUserInfo().then((r) => { this.isAuthenticated = (r !== null); },
        () => { this.isAuthenticated = false; });
    },
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted() {
    this.getIsAuthenticated();
  },
};
</script>

<template>
  <button
    class="link card-footer-item"
    :class="className"
    :aria-label="label"
    tabindex="0"
    @click="handleClick"
    :data-index="dataIndex"
    :data-id="dataId"
  >
    <i :class="iconClasses"></i>
    <span>{{ label }}</span>
  </button>
</template>
