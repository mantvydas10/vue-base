<template>
  <div class="pagination">
    <a
      class="pagination-link"
      :disabled="isInFirstPage"
      @click="onClickFirstPage"
      >First</a
    >
    <a
      class="pagination-previous"
      @click="previousPage"
      :disabled="isInFirstPage"
      >Previous</a
    >
    <a
      class="pagination-link"
      v-for="page in pages"
      :key="page"
      :class="{ active: isPageActive(page) }"
      @click="changePage(page)"
      >{{ page }}</a
    >

    <a class="pagination-next" @click="nextPage" :disabled="isInLastPage"
      >Next page</a
    >
    <a class="pagination-link" :disabled="isInLastPage" @click="onClickLastPage"
      >Last</a
    >
  </div>
</template>

<script>
export default {
  props: {
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
  computed: {
    isInLastPage() {
      return this.current === this.pages;
    },
    isInFirstPage() {
      return this.current === 1;
    }
  },
  methods: {
    onClickLastPage() {
      this.$emit("changePage", this.pages);
    },
    onClickFirstPage() {
      this.$emit("changePage", 1);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
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
