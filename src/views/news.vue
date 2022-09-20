<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
    />
    <div>
      <label for="search-bar" class="search-bar">Search:</label>
      <input
        v-model="searchQuery"
        class="searchQuery"
        placeholder="Search Post"
      />
      <button @click="getDataBySearch()">
        Find
      </button>
    </div>
    <h1>POSTS</h1>
    <div class="table1">
      <table class="table is-bordered">
        <div class="box" v-for="item in name" :key="item.id">
          <p v-text="item.title"></p>
          <p v-text="item.author"></p>
          <p v-text="formatDate(item.created_at)"></p>
          <p v-text="item.updated_at"></p>
          <button @click="deleteArticle(item.id)">Delete</button>
          <button @click="toggleEditModal(item)">Edit Post</button>
          <button @click="openPost(item.id)">Details</button>
        </div>
      </table>
    </div>
    <transition name="bounce">
      <deleteModal :id="selectedPost" v-if="modalDeleteStatus"></deleteModal>
    </transition>

    <transition name="bounce">
      <editModal
        v-if="editModalStatus"
        :item="selectedEdit"
        :key="modalKey"
      ></editModal>
    </transition>

    <transition name="bounce">
      <modal v-show="modalStatus" @data-reload="getData()" ref="modal"></modal>
    </transition>

    <paginations
      class="pagi"
      :totalPages="10"
      :perPage="5"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    ></paginations>

    <button class="button-55" @click="openRemove()">
      Create a Post
    </button>
  </div>
</template>

<script>
import axios from "axios";
import modal from "@/components/modal.vue";
import deleteModal from "@/components/deleteModal.vue";
import moment from "moment";
import paginations from "@/components/paginations.vue";
import parseLinkHeader from "parse-link-header";
import editModal from "@/components/editModal.vue";
export default {
  name: "news",
  components: {
    modal,
    paginations,
    deleteModal,
    editModal
  },

  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      name: [],
      modalStatus: false,
      modalDeleteStatus: false,
      editModalStatus: false,
      searchQuery: "",
      // first: null,
      // last: null,
      // next: null,
      // prev: null,
      selectedPost: null,
      selectedEdit: null,
      modalKey: true
      // props: {
      //   maxVisibleButtons: {
      //     type: Number,
      //     required: false,
      //     default: 5
      //   },
      //   totalPages: {
      //     type: Number,
      //     required: true
      //   },
      //   perPage: {
      //     type: Number,
      //     required: true
      //   },
      //   currentPage: {
      //     type: Number,
      //     required: true
      //   }
      // }
    };
  },
  methods: {
    toggleEditModal(item) {
      this.modalKey = !this.modalKey;
      this.selectedEdit = item;
      this.editModalStatus = !this.editModalStatus;
    },
    toggleDeleteModal() {
      this.modalDeleteStatus = !this.modalDeleteStatus;
    },
    deleteArticle(id) {
      this.selectedPost = id;
      this.modalDeleteStatus = true;
    },
    openRemove() {
      this.modalStatus = true;
      this.$refs.modal.removeL();
    },
    toggleModal() {
      this.modalStatus = !this.modalStatus;
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },

    getData() {
      axios
        .get("http://localhost:3000/posts", {
          params: { _limit: 5, _page: this.currentPage, q: this.searchQuery }
        })
        .then(response => {
          this.name = response.data;
          // this.totalPages = Math.floor(response.headers["x-total-count"] / 5);
        })
        .catch(error => console.log(error));
    },

    // getData(URL) {
    //   axios
    //     .get(URL)
    //     .then(response => {
    //       console.log(response);
    //       // var pagination = parseLinkHeader(response.headers.link);
    //       // if (pagination != null) {
    //       //   if (pagination.first) {
    //       //     this.first = pagination.first.url;
    //       //   } else this.first = null;
    //       //   if (pagination.last) {
    //       //     this.last = pagination.last.url;
    //       //   } else this.last = null;
    //       //   if (pagination.next) {
    //       //     this.next = pagination.next.url;
    //       //   } else this.next = null;
    //       //   if (pagination.prev) {
    //       //     this.prev = pagination.prev.url;
    //       //   } else this.prev = null;
    //       // } else {
    //       //   this.first = null;
    //       //   this.last = null;
    //       //   this.next = null;
    //       //   this.prev = null;
    //       // }
    //       this.name = response.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    getDataBySearch() {
      axios
        .get(
          "http://localhost:3000/posts?q=" +
            this.searchQuery +
            "&_page=1&_limit=5"
        )
        .then(response => {
          console.log(response.data);

          this.name = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    openPost(id) {
      this.$router.push(`/details/${id}`);
    },
    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
      this.getData();
    }
  },
  mounted() {
    this.getData("http://localhost:3000/posts");
  }
};
</script>

<style scoped>
.pagi {
  margin-top: 20px;
  justify-content: center;
}
.box {
  border: 1px solid black;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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
.box {
  background: content-box;
  color: white;
}
.box:hover {
  transform: translate3d(5px, 0, 0);
  box-shadow: 5px 5px #888888;
  border: 2px solid black;
  cursor: pointer;
}
.table {
  background: border-box;
}
.table1 {
  display: flex;
  justify-content: center;
  background: border-box;
}

.button-55 {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-55:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-55:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}
</style>
