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
    <notification
      v-if="notiMsg != ''"
      :message="notiMsg"
      :type="notiStatus"
      @closeNotificationModal="closeNotificationModal()"
    ></notification>
  </div>
</template>

<script>
import notification from "@/components/notification.vue";
import dates from "../mixins/dates.js";
import PostResourceService from "../services/post/PostResourceService.js";

export default {
  components: { notification },
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
      notiMsg: "",
      notiStatus: "",
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
    closeNotificationModal() {
      this.notiMsg = !this.notiMsg;
    },
    async submitEditPost() {
      try {
        this.postData.updated_at = new Date().getTime();

        const response = await PostResourceService.editPost(
          this.postData.id,
          this.postData
        );
        this.notiMsg = "Successfully Edited Post!";
        this.notiStatus = "is-success";
        this.$emit("toggleEditModal");
        this.$router.go();
      } catch (error) {}
    },

    editPost() {
      if (!this.postData.title) {
        this.notiStatus = "is-warning";
        this.notiMsg = "Title required!";
        

        return;
      }

      if (!this.postData.body) {
        this.notiStatus = "is-warning";
        this.notiMsg = "Content required!";
       

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
