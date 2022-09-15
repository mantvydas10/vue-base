<template>
  <nav
    class="pagination is-centered is-rounded"
    role="navigation"
    aria-label="pagination"
  >
    <a
      @click="$parent.getData($parent.first)"
      v-if="$parent.first != null"
      class="pagination-previous"
      >First</a
    >
    <a
      @click="$parent.getData($parent.last)"
      v-if="$parent.last != null"
      class="pagination-previous"
      >Last</a
    >
    <a
      @click="$parent.getData($parent.next)"
      v-if="$parent.next != null"
      class="pagination-previous"
      >Next</a
    >
    <a
      @click="$parent.getData($parent.prev)"
      v-if="$parent.prev != null"
      class="pagination-previous"
      >Prev</a
    >
  </nav>
</template>

<script>
import Pagination from "vue-pagination-2";
export default {
  name: "pagination",
  components: {
    Pagination
  }
};
</script>

<style>
.pagination a {
  border: double;
  transition: 0.3s;
}
</style>
