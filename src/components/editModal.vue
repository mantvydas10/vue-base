<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Post:</p>
        <button
          @click="$parent.toggleEditModal()"
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
        <button class="button is-success">
          Save
        </button>
        <button @click="$parent.toggleEditModal()" class="button">
          Close Modal
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import notyToast from "../mixins/notyToast.js";
import axios from "axios";
import moment from "moment";

export default {
  mixins: [notyToast],
  name: "editModal",
  props: {
    item: Object
  },
  mounted() {
    this.postData.title = this.item.title;
    this.postData.body = this.item.body;
    this.postData.id = this.item.id;
    this.postData.author = this.item.author;
  },
  data() {
    return {
      postData: {
        title: "",
        body: "",
        id: "",
        author: ""
      }
    };
  },

  methods: {
    editPost() {
      axios
        .put("http://localhost:3000/posts" + "/news/" + this.id, {
          id: this.postData.id,
          title: this.postData.title,
          body: this.postData.body,
          updated_at: this.formatDate(date),
          created_at: this.created_at,
          author: this.postData.author
        })
        .then(r => {});
    },

    checkPost(){
      
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
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
