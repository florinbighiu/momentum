import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://momentum-fpou.onrender.com",
});

export default axiosClient;

