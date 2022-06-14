import { TYPES } from "./AppTypes";

export const fetchBlogRequest = () => {
    return {
        type: TYPES.FETCH_BLOG_REQUEST
    }
}
export const fetchBlogFailure = err => {
    return {
        type: TYPES.FETCH_BLOG_FAILURE,
        payload: err
    }
}

export const fetchBlogSuccess = blogs => {
    return {
        type: TYPES.FETCH_BLOG_SUCCESS,
        payload: blogs
    }
}

export const postedBlog = blog => {
    return {
        type: TYPES.POSTED_BLOG,
        payload: blog
    }
}