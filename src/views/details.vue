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
          <span>{{ posts.title }}</span>
          <h1 class="top">Author:</h1>
          <input :value="posts.author" :disabled="true" />
          <h1 class="top">Content:</h1>
          <textarea
            :disabled="true"
            :value="posts.body"
            class="dot"
            rows="20"
            cols="50"
          />
          <p v-text="formatDate(posts.created_at)"></p>
          <button @click="toggleEditModal()">Edit Post</button>
          <button @click="deleteArticle(posts.id)">Delete Post</button>
          <transition name="bounce">
            <editModal v-if="editModalStatus" :item="posts"></editModal>
          </transition>
          <transition name="bounce">
            <deleteModal
              @delete-refresh="getData()"
              :id="selectedPost"
              v-show="modalDeleteStatus"
            ></deleteModal>
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import notyToast from "../mixins/notyToast.js";
import PostResourceService from "@/services/post/PostResourceService.js";
import deleteModal from "../components/deleteModal.vue";
import moment from "moment";
import editModal from "../components/editModal.vue";

export default {
  name: "detail",
  mixins: [notyToast],
  components: { editModal, deleteModal },
  data() {
    return {
      searchQuery: "",
      posts: {},
      modalDeleteStatus: false,
      selectedPost: null,
      editModalStatus: false,
      disabled: false
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    deleteArticle(id) {
      this.selectedPost = id;
      this.modalDeleteStatus = true;
    },
    toggleDeleteModal() {
      this.modalDeleteStatus = !this.modalDeleteStatus;
    },
    toggleEditModal() {
      this.editModalStatus = !this.editModalStatus;
    },
    getData() {
      this.$router.push({ name: "news" });
    }
  },
  async created() {
    try {
      this.posts = await PostResourceService.getPost(this.$route.params.id);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
