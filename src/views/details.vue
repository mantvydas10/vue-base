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
          <span class="bot">{{ posts.title }}</span>
          <h1 class="top">Author:</h1>
          <span class="bot">{{ posts.author }}</span>
          <h1 class="top">Content:</h1>
          <span class="bot">{{ posts.body }}</span>

          <p v-text="formatDate(posts.created_at)"></p>
          <button @click="toggleEditModal()">Edit Post</button>
          <button @click="deleteArticle(posts.id)">Delete Post</button>
          <transition name="bounce">
            <editModal
              v-if="EditModalStatus"
              :item="posts"
              @toggleEditModal="toggleEditModal()"
            ></editModal>
          </transition>
          <transition name="bounce">
            <deleteModal
              @data-reload="getData()"
              @toggleDeleteModal="toggleDeleteModal()"
              :id="selectedPost"
              v-show="DeleteModalStatus"
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
      DeleteModalStatus: false,
      selectedPost: null,
      EditModalStatus: false
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    deleteArticle(id) {
      this.selectedPost = id;
      this.DeleteModalStatus = true;
    },
    toggleDeleteModal() {
      this.DeleteModalStatus = !this.DeleteModalStatus;
    },
    toggleEditModal() {
      this.EditModalStatus = !this.EditModalStatus;
    },
    getData() {
      this.$router.push({ name: "news" });
    }
  },
  async created() {
    try {
      this.posts = await PostResourceService.getPost(this.$route.params.id);
    } catch (error) {}
  }
};
</script>

<style>
.top {
  font-size: x-large;
  width: 120px;
  margin: auto;
  margin-top: 30px;
}

.bot {
  font-size: xx-large;
}
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
