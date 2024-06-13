import axios from "axios";
import Cookies from "js-cookie";

// const BASE_URL = import.meta.VITE_BACKEND_URL;
const BASE_URL = "http://localhost:3500/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token") || null;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// AUTH ROUTES
export const getCurrentUser = () => {
  return API.get("/auth/current");
};

export const signInUser = (formData) => {
  return API.post("/auth/signIn", formData);
};

export const signUpUser = (formData) => {
  return API.post("/auth/signUp", formData);
};

// PROFILE ROUTES
export const getUsers = (search) => {
  return API.get(`/profile/users?q=${search}`);
};
export const getUserFollowers = (userId) => {
  return API.get(`/profile/${userId}/followers/list`);
};
export const getUserFollowing = (userId) => {
  return API.get(`/profile/${userId}/following/list`);
};
export const getUserSuggestion = () => {
  return API.get("/profile/users/suggestion");
};
export const getProfileByUserId = (userId) => {
  return API.get(`/profile/${userId}`);
};
export const followUnfollowUser = (userId) => {
  return API.patch(`/profile/${userId}/follow`);
};
export const updateUserProfile = (formData) => {
  return API.patch("/profile/current/me", formData);
};
// ============================================================
// POSTS ROUTES
// ============================================================

// ================ GET ALL POST  ------------------ FILTERING......
export const getPosts = (page) => {
  return API.get(`/post?limit=5&page=${page}`);
};
// ================ CREATE POST
export const createPost = (payload) => {
  return API.post(`/post`, payload);
};
// ================ GET USERS POST ------------------- FILTERING......
export const getUsersPosts = (userId) => {
  return API.get(`/post/all/${userId}`);
};

// ================ LIKE DISLIKE POST
export const likeDislikePost = (postId) => {
  return API.patch(`/post/like/${postId}`);
};
// ================ RETWEET DETWEET POST
export const retweetDetweetPost = (postId) => {
  return API.patch(`/post/retweet/${postId}`);
};
// ================ BOOKMARK UNBOOKMARK POST
export const bookmarkUnBookmarkPost = (postId) => {
  return API.patch(`/post/bookmark/${postId}`);
};

// ================ GET ALL TAGS
export const getAllTags = () => {
  return API.get("/post/tags");
};

// ============================================================
// COMMENT ROUTES
// ============================================================

// ================ GET  POST COMMENTS
export const getComments = (postId, page) => {
  return API.get(`/comment/${postId}?page=${page}`);
};

// ================ CREATE COMMENT
export const addComment = (postId, payload) => {
  console.log("api", postId, payload);
  return API.post(`/comment/${postId}`, payload);
};

// ================ LIKE DISLIKE POST COMMENT
export const likeDislikeComment = (postId, commentId) => {
  return API.patch(`/comment/${postId}/like/${commentId}`);
};

// // ================ DELETE COMMENT
export const deleteComment = (postId, commentId) => {
  return API.delete(`/comment/${postId}/delete/${commentId}`);
};

// // ================ UPDATE COMOMENT
// export const updateComment = (postId, commentId, payload) => {
//   return API.patch(`/comment/${postId}/update/${commentId}`, payload);
// };

// ============================================================
// EXPLORE ROUTES
// ============================================================
export const explore = ({ type, search }) => {
  // console.log("query", { type, search });
  return API.get(`/explore?q=${type}&search=${search}`);
};

export const bookmarkExplore = ({ type, userId }) => {
  return API.get(`/bookmark/${userId}?q=${type}`);
};
