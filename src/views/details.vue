<template>
  <div>
    <div class="">
      <div class=""></div>
      <div class="">
        <header class="">
          <p class=""></p>
        </header>
        <section class="">
          <h1 class="top">Title:</h1>
          <input :value="post.title" />
          <h1 class="top">Author:</h1>
          <input :value="post.author" />
          <h1 class="top">Content:</h1>
          <textarea :value="post.body" class="dot" rows="20" cols="50" />
          <p v-text="formatDate(post.created_at)"></p>
          <button>Edit Post</button>
          <button>Delete Post</button>
        </section>
        <!-- <footer class="modal-card-foot"></footer> -->
      </div>
    </div>
    <!-- <deleteModal></deleteModal> -->
  </div>
</template>

<script>
import axios from "axios";
import pagination from "../components/pagination.vue";
import notyToast from "../mixins/notyToast.js";
import news from "../views/news.vue";
import deleteModal from "../components/deleteModal.vue";
import moment from "moment";
import editModal from "../components/editModal.vue";

export default {
  name: "detail",
  mixins: [notyToast],
  components: { pagination, news, editModal, deleteModal },
  data() {
    return {
      searchQuery: "",
      post: {}
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  created() {
    axios
      .get(`http://localhost:3000/posts/${this.$route.params.id}`)
      .then(response => (this.post = response.data));
  }
};
</script>

<style></style>
