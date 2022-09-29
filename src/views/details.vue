<template>
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

      <div>
        <p
          clas="font"
          v-if="!posts.updated_at"
          v-text="formatDate(posts.created_at)"
        ></p>
        <p v-if="posts.updated_at" v-text="formatDate(posts.updated_at)"></p>
      </div>

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
          @data-reload="retrievePage()"
          @toggleDeleteModal="toggleDeleteModal()"
          :id="selectedPost"
          v-show="DeleteModalStatus"
          @deletePost="handlePostDelete"
        ></deleteModal>
      </transition>
    </section>
  </div>
</template>

<script>
import dates from "../mixins/dates.js";
import PostResourceService from "@/services/post/PostResourceService.js";
import deleteModal from "../components/deleteModal.vue";
import editModal from "../components/editModal.vue";

export default {
  name: "detail",
  mixins: [dates],
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
    handlePostDelete(answer) {
      if (answer) {
        PostResourceService.deletePost(this.selectedPost).then(
          this.$router.push({ name: "news" })
        );
        this.notiMsg = "Successfully Deleted Post!";
        this.notiStatus = "is-success";
        this.selectedPost = null;
      } else this.toggleDeleteModal();
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
    retrievePage() {
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
