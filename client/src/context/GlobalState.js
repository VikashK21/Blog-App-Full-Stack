import axios from "axios";
import React, { createContext, useReducer } from "react";
// import config from "../config";
import {
  fetchBlogFailure,
  fetchBlogRequest,
  fetchBlogSuccess,
  postedBlog
} from "./AppActions";
import AppReducer, { initailState } from "./AppReducer";

// Create Context
export const GlobalContext = createContext(initailState);

// Provider Component
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initailState);

  // Actions
  function getBlogs() {
    dispatch(fetchBlogRequest);
    // axios.get(config.base_URL + '/api/blogs/', {}, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Cookie": document.cookie
    //   }
    // })
    axios
      .get("/api/blogs/")
      .then(res => {
        const id = res.data.id;
        const blogs = res.data.result.map(ele => {
          const reaction = JSON.parse(ele.reactor_id[0]);
          if (reaction.liked.includes(id)) {
            return { ...ele, liked: true, disliked: false };
          } else if (reaction.disliked.includes(id)) {
            return { ...ele, liked: false, disliked: true };
          } else {
            return { ...ele, liked: false, disliked: false };
          }
        });
        dispatch(fetchBlogSuccess({ blogs, id }));
      })
      .catch(err => {
        dispatch(fetchBlogFailure(`${err.message}`));
      });
  }

  function Likes_Dislikes(id, reaction) {
    // axios.post(config.base_URL + `/api/blogs/likes_dislikes/${id}`, reaction)
    axios
      .post(`/api/blogs/likes_dislikes/${id}`, reaction)
      .then(res => {})
      .catch(err => {
        dispatch(fetchBlogFailure(`${err.message}`));
      });
  }
  function CreateBlog(data) {
    // axios
    //   .post(config.base_URL + "/api/blogs/post", data)
    axios
      .post("/api/blogs/post", data)
      .then(res => {
        const data2 = res.data.result;
        dispatch(postedBlog(data2));
      })
      .catch(err => {
        dispatch(fetchBlogFailure(`${err.message}`));
      });
  }
  function EditBlog(id) {}
  function Logout() {
    // axios
    //   .post(config.base_URL + `/api/users/logout`)
    axios
      .post(`/api/users/logout`)
      .then(res => {
        const data = res.data.result;
        dispatch(fetchBlogFailure(data));
      })
      .catch(err => {
        dispatch(fetchBlogFailure(`${err.message}`));
      });
  }

  function Comment(id, comment) {
    axios
      .post(`/api/blog/comment/${id}`, { comment_msg: comment })
      .then(res => {
        const data = res.data.result;
        console.log(data);
      })
      .catch(err => {
        dispatch(fetchBlogFailure(`${err.message}`));
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        blogs: state.blogs,
        error: state.error,
        id: state.id,
        getBlogs,
        Likes_Dislikes,
        CreateBlog,
        EditBlog,
        Logout,
        Comment
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
