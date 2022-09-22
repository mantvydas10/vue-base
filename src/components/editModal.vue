<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Post:</p>
        <button
          @click="$emit('toggleEditModal')"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        <h1 class="top"><span class="oneL">T</span>itle:</h1>
        <input v-model="postData.title" />
        <h1 class="top"><span class="oneL">C</span>ontent:</h1>
        <textarea v-model="postData.body" class="dot" rows="10" cols="24" />
      </section>
      <footer class="modal-card-foot">
        <button @click="editPost()" class="button is-success">
          Save
        </button>
        <button @click="$emit('toggleEditModal')" class="button">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import dates from "../mixins/dates.js";
import PostResourceService from "../services/post/PostResourceService.js";

export default {
  mixins: [dates],
  name: "editModal",
  props: {
    item: Object
  },
  mounted() {
    this.postData = this.item;
  },
  data() {
    return {
      postData: {
        title: "",
        body: "",
        id: "",
        author: "",
        updated_at: 0
      }
    };
  },

  methods: {
    async submitEditPost() {
      try {
        this.postData.updated_at = new Date().getTime();

        const response = await PostResourceService.editPost(
          this.postData.id,
          this.postData
        );

        this.$emit("toggleEditModal");
        this.$router.go();
        this.notyToast("Successfully edited the P0ST!", "success");
      } catch (error) {}
    },

    editPost() {
      if (!this.postData.title) {
        this.notyToast("Title required!", "warning");

        return;
      }

      if (!this.postData.body) {
        this.notyToast("Content required!", "warning");

        return;
      }

      this.submitEditPost();
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
</style>
