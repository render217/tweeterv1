/* eslint-disable no-unused-vars */
import {
  QueryClient,
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
  likeDislikeComment, // done
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
export const useGetAllUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: () => getUsers(),
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
  // let clientUserId;
  return useMutation({
    mutationFn: (userId) => {
      // clientUserId = userId;
      return followUnfollowUser(userId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROFILE_BY_USERID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
      });
    },
  });
};
// ============================================================
// POST QUERIES
// ============================================================
export const useGetAllPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_POSTS],
    queryFn: () => getPosts(),
  });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
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
    },
  });
};
export const useGetAllTags = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => {},
  });
};

// ============================================================
// COMMENT QUERIES
// ============================================================
export const useGetComments = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
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
      console.log("scu", axiosResponse);
      const postId = axiosResponse.data.payload.comment.post;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS, postId],
      });
    },
  });
};
// export const useDeleteComment = () => {
//   return useQuery({
//     queryKey: [],
//     queryFn: () => {},
//   });
// };

// export const useUpdateComment = () => {
//   return useQuery({
//     queryKey: [],
//     queryFn: () => {},
//   });
// };
