
import axios from "axios";

const API = axios.create({
  baseURL: "https://student-portal-be.onrender.com/api/forum",
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const fetchPosts = () => API.get("/");


export const getPost = (id) => API.get(`/${id}`);


export const createPost = (newPost) => API.post("/", newPost);


export const deletePost = (id) => API.delete(`/${id}`);
