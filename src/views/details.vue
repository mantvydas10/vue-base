<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
      </header>
      <section class="modal-card-body">
        <h1 class="top">Title:</h1>
        <input :value="post.title" />
        <h1 class="top">Author:</h1>
        <input :value="post.author" />
        <h1 class="top">Content:</h1>
        <textarea :value="post.body" class="dot" rows="20" cols="50" />
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>

  <!-- <div>{{ post.title }}</div> -->
</template>

<script>
import axios from "axios";
import pagination from "../components/pagination.vue";
import notyToast from "../mixins/notyToast.js";
import news from "../views/news.vue";

export default {
  name: "detail",
  mixins: [notyToast],
  components: { pagination, news },
  data() {
    return {
      searchQuery: "",
      post: {}
    };
  },
  methods: {},
  created() {
    axios
      .get(`http://localhost:3000/posts/${this.$route.params.id}`)
      .then(response => (this.post = response.data));
  }
};
</script>

<style></style>
