<template>
  <div class="pagination">
    <a class="pagination-previous" @click="previousPage">Previous</a>
    <a
      class="pagination-link"
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
    >
      {{ page }}</a
    >

    <a class="pagination-next" @click="nextPage">Next page</a>
  </div>
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
      pages: 1
    };
  },
  created() {
    this.pages = this.getPageCount();
  },
  methods: {
    getPageCount() {
      return Math.ceil(this.postsCount / 5);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    nextPage() {
      let page = this.current + 1;
      if (page > this.pages) {
        return;
      }
      this.current = page;
      this.changePage(page);
    },
    previousPage() {
      let page = this.current - 1;
      if (page < 1) {
        return;
      }
      this.current = page;
      this.changePage(page);
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
