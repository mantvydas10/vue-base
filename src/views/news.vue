<template>
  <div>
    <!-- <div class="noty"> -->

    <!-- <notification
      v-show="showMsg"
      @closeNotificationModal="closeNotificationModal()"
    ></notification> -->

    <!-- </div> -->
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
    <h1 class="title is-3">POSTS</h1>

    <h1 v-if="noDataError">Can't retrieve data from server</h1>

    <div class="card" v-for="item in name" :key="item.id">
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <p class="font" v-text="item.title"></p>
            </div>
          </div>

          <div class="field">
            <label class="label">Author</label>
            <div>
              <p class="font" v-text="item.author"></p>
            </div>
          </div>
          <div class="field">
            <label class="label">Date</label>
            <div>
              <p
                clas="font"
                v-if="!item.updated_at"
                v-text="formatDate(item.created_at)"
              ></p>
              <p
                v-if="item.updated_at"
                v-text="formatDate(item.updated_at)"
              ></p>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <router-link :to="getPostDetailsRouteLink(item.id)">
                <button class="button is-link">Details</button>
              </router-link>
            </div>
            <div class="control">
              <button
                @click="toggleEditModal(item)"
                class="button is-link is-light"
              >
                Edit Post
              </button>
            </div>
            <div class="control">
              <button
                @click="deleteArticle(item.id)"
                class="button is-link is-light"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="bounce">
      <!-- @data-reload="getData()" -->
      <deleteModal
        @toggleDeleteModal="toggleDeleteModal()"
        :id="selectedPost"
        v-if="DeleteModalStatus"
      ></deleteModal>
    </transition>

    <transition name="bounce">
      <editModal
        v-if="EditModalStatus"
        :item="selectedEditModal"
        @toggleEditModal="toggleEditModal()"
      ></editModal>
    </transition>

    <transition name="bounce">
      <PostModal
        v-show="PostModalStatus"
        @data-reload="getData()"
        @togglePostModal="togglePostModal()"
        ref="modal"
      ></PostModal>
    </transition>

    <pagination
      :key="postsCount"
      class="pagi"
      :totalCount="postsCount"
      :currentPage="currentPage"
      @changePage="onPageChange"
    ></pagination>

    <button class="button-55" @click="openRemove()">
      Create a Post
    </button>
  </div>
</template>

<script>
import notification from "@/components/notification.vue";
import PostResourceService from "@/services/post/PostResourceService.js";
import dates from "../mixins/dates.js";
import { ROUTE_NAME } from "@/router/index.js";
import PostModal from "@/components/PostModal.vue";
import deleteModal from "@/components/deleteModal.vue";
import pagination from "@/components/pagination.vue";
import editModal from "@/components/editModal.vue";
export default {
  name: "news",
  mixins: [dates],
  components: {
    PostModal,
    pagination,
    deleteModal,
    editModal,
    notification
  },

  data() {
    return {
      perPage: 5,
      currentPage: 1,
      totalPages: 0,
      name: [],
      PostModalStatus: false,
      DeleteModalStatus: false,
      EditModalStatus: false,
      searchQuery: "",
      selectedPost: null,
      selectedEditModal: null,
      noDataError: false,
      postsCount: 0
    };
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page ? page : 1;
      this.getData();
    },
    toggleEditModal(item) {
      this.selectedEditModal = item;
      this.EditModalStatus = !this.EditModalStatus;
    },

    toggleDeleteModal() {
      this.DeleteModalStatus = !this.DeleteModalStatus;
    },
    deleteArticle(id) {
      this.selectedPost = id;
      this.DeleteModalStatus = true;
    },
    openRemove() {
      this.PostModalStatus = true;
      this.$refs.modal.removeStrings();
    },
    togglePostModal() {
      this.PostModalStatus = !this.PostModalStatus;
    },

    async getData() {
      let response = {};
      try {
        response = await PostResourceService.getPosts(
          this.searchQuery,
          this.currentPage
        );
      } catch (error) {
        console.log(error);
        this.noDataError = true;
      }
      this.name = response.data;
      this.postsCount = parseInt(response.headers["x-total-count"]);
    },

    async getDataBySearch() {
      try {
        this.name = await PostResourceService.getPosts(this.searchQuery);
      } catch (error) {}
    },
    getPostDetailsRouteLink(id) {
      return { name: ROUTE_NAME.DETAILS, params: { id: id } };
    }
  },
  async created() {
    await this.getData();
  }
};
</script>

<style scoped>
/* .noty {
  margin-bottom: 30px;
  display: inline-block;
  width: 25%;
  z-index: 1;
} */
.font {
  font-size: x-large;
}
.card {
  width: fit-content;
  display: flex;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 34px;
  border: 1px solid black;
  transform: scale(1);
}
.card:hover {
  transform: scale(1.03);
}
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
.title.is-3 {
  margin-top: 20px;
}
</style>
