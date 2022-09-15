<template>
  <div>{{ post.title }}</div>
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
