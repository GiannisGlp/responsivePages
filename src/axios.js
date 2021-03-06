import axios from "axios";

const instance = axios.create({
  baseURL: "https://pagesmanagement.azurewebsites.net/api",
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
