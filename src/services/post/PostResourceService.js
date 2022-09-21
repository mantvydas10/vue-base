import axios from "axios";
export default class PostResourceService {
  static get baseURL() {
    return process.env.URL + "/posts";
  }

  static getPosts(query, page = 1, limit = 5) {
    return axios
      .get(this.baseURL, {
        params: {
          q: query,
          _limit: limit,
          _page: page
        }
      })
      .then(response => {
        return response.data;
      });
  }

  static getPost(id) {
    return axios.get(this.baseURL + "/" + id).then(response => {
      return response.data;
    });
  }
}
