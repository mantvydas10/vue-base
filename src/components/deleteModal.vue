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
          <button @click="deletePost()">Yes, I'm sure!</button>
        </div>
        <div>
          <button @click="$parent.toggleDeleteModal()">Close Modal</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getMapData from "lodash/_getMapData";
import notyToast from "../mixins/notyToast";

export default {
  mixins: [notyToast],
  name: "deleteModal",
  props: {
    id: Number
  },

  methods: {
    deletePost() {
      axios
        .delete("http://localhost:3000/posts/" + this.id)
        .then(_ => {
          this.$parent.toggleDeleteModal();
          this.notyToast("Successfully deleted the Post!", "success");
          this.getData("http://localhost:3000/posts");
        })
        // if (this.$parent.$options.name == "news") {
        //   this.$parent.getData("http://localhost:3000/posts");
        //   this.$parent.toggleDeleteModal();
        //   this.notyToast("Successfully deleted the Post!", "success");
        // } else if (this.$parent.$options.posts.id == "detail") {
        // this.$parent.getData("http://localhost:3000/posts");
        // this.$parent.toggleDeleteModal();

        .catch(error => {
          console.log(error);
          this.notyToast("Something went wrong!", "error");
        });
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
