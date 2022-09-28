<template>
  <div>{{ totalPages }}</div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5
    },
    totalCount: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      current: 1,
      postsCount: this.totalCount,
      totalPages: 1
    };
  },
  created() {
    console.log(this.getPageCount());
  },
  methods: {
    getPageCount() {
      console.log(this.postsCount);
      return this.postsCount / 5;
    }
  }
};
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #3caae0;
  color: #ffffff;
}
</style>
