import axios from "axios";
export default class PostResourceService {
  static get baseURL() {
    return process.env.URL + "/posts?_limit=5";
  }

  static getPosts(query) {
    return axios
      .get(this.baseURL, {
        params: {
          q: query
        }
      })
      .then(response => {
        return response;
      });
  }

  static getPost(id) {
    return axios.get(this.baseURL + "/" + id).then(response => {
      return response.data;
    });
  }

  static editPost(id, data) {
    return axios.put(this.baseURL + "/" + id, data).then(response => {
      return response.data;
    });
  }

  static createPost(data) {
    return axios.post(this.baseURL, data).then(response => {
      return response.data;
    });
  }

  static deletePost(id) {
    return axios.delete(this.baseURL + "/" + id).then(response => {
      return response.data;
    });
  }
}
