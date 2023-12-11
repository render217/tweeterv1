/* eslint-disable no-unused-vars */
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCurrentUser, // done
  signInUser, // done
  signUpUser, // done
  //
  getUsers, // done | Filtering | searching | pagination reamining
  updateUserProfile,
  //
  getProfileByUserId, // done
  followUnfollowUser, // done
  //
  getUserFollowers,
  getUserFollowing,

  //
  getPosts, // done | filtering,searching remainnig | pagination
  createPost, // done | photo remaining
  //
  getUsersPosts,
  //
  likeDislikePost, // done
  retweetDetweetPost, // done
  bookmarkUnBookmarkPost, // done
  //
  getAllTags,
  //
  getComments, // done  | pagination
  addComment, // done
  deleteComment,
  likeDislikeComment, // done
  explore, // done
  bookmarkExplore, // done
  getUserSuggestion, // done
} from "../api";
import { QUERY_KEYS } from "./queryKeys";

// ============================================================
// AUTH QUERIES
// ============================================================
export const useSignInUser = () => {
  return useMutation({
    mutationFn: (formData) => signInUser(formData),
  });
};

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (formData) => signUpUser(formData),
  });
};

// get current user
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getCurrentUser(),
  });
};
// ============================================================
// PROFILE QUERIES
// ============================================================
export const useGetAllUser = ({ search }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: () => getUsers(search),
  });
};
export const useGetUserSuggestions = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SUGGESTIONS],
    queryFn: () => getUserSuggestion(),
  });
};
export const useGetCurrentProfile = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => {},
  });
};
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => updateUserProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
      });
    },
  });
};
export const useGetProfileByUserId = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROFILE_BY_USERID, userId],
    queryFn: () => getProfileByUserId(userId),
    enabled: !!userId,
  });
};
export const useFollowUnFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => {
      return followUnfollowUser(userId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROFILE_BY_USERID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_SUGGESTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWERS_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_LIST],
      });
    },
  });
};

export const useGetFollowersList = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWERS_LIST, userId],
    queryFn: () => getUserFollowers(userId),
    enabled: !!userId,
  });
};

export const useGetFollowingList = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWING_LIST, userId],
    queryFn: () => getUserFollowing(userId),
    enabled: !!userId,
  });
};
// ============================================================
// POST QUERIES
// ============================================================
export const useGetAllPost = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_ALL_POSTS],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPage, allPage) => {
      // console.log("lastPage:", lastPage.data.payload.posts.length);
      // console.log("allPage", allPage.length);
      return lastPage.data.payload.posts.length
        ? allPage.length + 1
        : undefined;
    },
  });
};

// export const useGetAllPost = () => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_ALL_POSTS],
//     queryFn: () => getPosts(),
//   });
// };
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_TAGS],
      });
    },
  });
};
export const useGetUserPosts = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => {},
  });
};

export const useLikeDislikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => likeDislikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
    },
  });
};
export const useRetweetDetweetPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => retweetDetweetPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
    },
  });
};
export const useBookmarkUnBookmarkPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => bookmarkUnBookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
    },
  });
};
export const useGetAllTags = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_TAGS],
    queryFn: () => getAllTags(),
  });
};

// ============================================================
// COMMENT QUERIES
// ============================================================
export const useGetComments = (postId) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
    queryFn: ({ pageParam = 1 }) => getComments(postId, pageParam),
    enabled: !!postId,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.payload.comments.length
        ? pages.length + 1
        : undefined;
    },
  });
};
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }) => {
      return addComment(postId, { content });
    },
    onSuccess: (axiosResponse) => {
      console.log("scu", axiosResponse);
      const postId = axiosResponse.data.payload.comment.post;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
    },
  });
};
export const useLikeDislikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, postId }) => {
      return likeDislikeComment(postId, commentId);
    },
    onSuccess: (axiosResponse) => {
      const postId = axiosResponse.data.payload.comment.post;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
    },
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId),
    onSuccess: (axiosResponse) => {
      const postId = axiosResponse.data.payload.comment.post;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EXPLORE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE],
      });
    },
  });
};

// export const useUpdateComment = () => {
//   return useQuery({
//     queryKey: [],
//     queryFn: () => {},
//   });
// };

// ============================================================
// Explore and Bookmark QUERIES
// ============================================================
export const useExplore = ({ type, search }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EXPLORE, type],
    queryFn: () => {
      const filteredSearch = search?.replace(/#(?=[A-Za-z])/g, "");
      return explore({ type, search: filteredSearch });
    },
    enabled: !!type,
  });
};

export const useBookmarkExplore = ({ type, userId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BOOKMARK_EXPLORE, userId, type],
    queryFn: () => bookmarkExplore({ type, userId }),
    enabled: !!userId,
  });
};
