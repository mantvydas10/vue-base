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
          <button @click="deletePost(true)">
            Yes, I'm sure!
          </button>
        </div>
        <div>
          <button @click="deletePost(false)">No!</button>
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
    async deletePost(answer) {
      this.$emit("deletePost", answer);
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
