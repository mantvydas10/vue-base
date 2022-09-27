<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Post:</p>
      </header>
      <section class="modal-card-body">
        <h1>Are you sure you want to delete this post?</h1>
      </section>
      <footer class="modal-card-foot">
        <div>
          <button @click="deletePost()">
            Yes, I'm sure!
          </button>
        </div>
        <div>
          <button @click="$emit('toggleDeleteModal')">No!</button>
        </div>
      </footer>
    </div>
    <notification
      v-if="notiMsg != ''"
      :message="notiMsg"
      :type="notiStatus"
    ></notification>
  </div>
</template>

<script>
import notification from "@/components/notification.vue";
import PostResourceService from "../services/post/PostResourceService.js";

export default {
  components: { notification },
  name: "deleteModal",
  props: {
    id: Number
  },

  data() {
    return {
      notiMsg: "",
      notiStatus: ""
    };
  },

  methods: {
    async deletePost() {
      try {
        const response = await PostResourceService.deletePost(this.id);
        this.$emit("toggleDeleteModal");
        // this.$router.go();
        this.$emit("data-reload");
        this.notiStatus = "is-success";
        this.notiMsg = "Successfully Deleted!";
      } catch (error) {}
    }
  }
};
</script>

<style scoped>
.modal-background {
  background: linear-gradient(
    180deg,
    rgb(232, 232, 232, 0),
    rgb(169, 169, 169, 0),
    rgb(72, 72, 72, 0)
  );
}
.modal-card-foot {
  display: flex;
  justify-content: space-around;
}
</style>
