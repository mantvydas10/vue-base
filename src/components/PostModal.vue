<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">ℕ𝕖𝕨 ℙ𝕠𝕤𝕥:</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('togglePostModal')"
        ></button>
      </header>
      <section class="modal-card-body">
        <h1 class="top"><span class="oneL">T</span>itle:</h1>
        <input v-model="title" />
        <h1 class="top"><span class="oneL">A</span>uthor:</h1>
        <input v-model="author" />
        <h1 class="top"><span class="oneL">C</span>ontent:</h1>
        <textarea class="dot" v-model="body" rows="10" cols="24" />
      </section>
      <footer class="modal-card-foot">
        <button @click="checkPost()" class="button is-success">
          ℂ𝕣𝕖𝕒𝕥𝕖
        </button>
        <button class="button" @click="$emit('togglePostModal')">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import notyToast from "../mixins/notyToast.js";
import PostResourceService from "../services/post/PostResourceService.js";

export default {
  mixins: [notyToast],
  methods: {
    removeStrings() {
      this.title = "";
      this.author = "";
      this.body = "";
    },
    checkPost() {
      const letters = /^[A-Za-z]+$/;
      if (!this.author.match(letters)) {
        this.notyToast("Only letters!", "error");

        return;
      }

      if (
        this.title.length > 0 &&
        this.author.length > 0 &&
        this.body.length > 0
      ) {
        this.submitPost();
      } else {
        this.notyToast("You must complete all fields!", "error");
      }
    },
    async submitPost() {
      try {
        const response = await PostResourceService.createPost({
          title: this.title,
          author: this.author,
          body: this.body,
          created_at: new Date().getTime(),
          updated_at: 0
        });

        this.$emit("togglePostModal");
        this.$emit("data-reload");
        this.notyToast("Successfully added the P0ST!", "success");
      } catch (error) {
        this.notyToast("Something went wrong!", "error");
      }
    }
  },
  data() {
    return {
      title: "",
      author: "",
      body: ""
    };
  }
};
</script>

<style scoped>
.modal-card-head {
  background: linear-gradient(45deg, #134e5e, #71b280);
}

.modal-card-title {
  font-weight: bold;
  font-size: xx-large;
}
.button.is-success {
  color: black;
  font-weight: 400;
}

.modal-background {
  background: linear-gradient(
    180deg,
    rgb(232, 232, 232, 0),
    rgb(169, 169, 169, 0),
    rgb(72, 72, 72, 0)
  );
}
.top {
  font-size: 15px;
  font-weight: 800;
}
.oneL {
  color: black;
  font-size: 19px;
}
.dot {
  border-style: dotted;
}
</style>
