import axios from "axios";

const URL = "http://localhost:5000/tasks";

export default class HttpService {
  constructor() {
    this.axios = new axios.create({
      baseURL: URL,
    });
  }
  get() {
    return this.axios.get("/");
  }
  getById(id) {
    return this.axios.get(`/${id}`);
  }
  post(model) {
    return this.axios.post("/", model);
  }
  put(model) {
    return this.axios.put(`/${model.id}`, model);
  }
  delete(id) {
    return this.axios.delete(`/${id}`);
  }
}
