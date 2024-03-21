import {useQuery, useMutation, useQueryClient, useInfiniteQuery, QueryClient} from '@tanstack/react-query';
import { INewGroup, INewPost, INewUser, IUpdateGroup, IUpdatePost } from '../../../types';
import { createGroup, createPost, createUserAccount, getCurrentUser, getPostById, getRecentPosts, likePost, signInAccount, signOutAccount, updateGroup, updatePost } from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

//create new user account 
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user:INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user:{
            email:string; 
            password:string;
        }) => signInAccount(user)
    })
}

export const useSignOutAccout = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useGetCurrentUser = () =>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

// POSTS SECTION
export const useCreatePost = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post:INewPost) => createPost(post),
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useGetRecentPost= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })
}

export const useLikePost = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({postId, likeArray}:{postId:string; likeArray:string[]}) =>likePost(postId, likeArray),
        onSuccess:(data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled:  !!postId
    })
}

//GROUP CREATION SECTION
export const useCreateGroup = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (group:INewGroup) => createGroup(group),
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_GROUPS]
            })
        }
    })
}

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (group: IUpdateGroup) => updateGroup(group),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_GROUP_BY_ID, data?.$id]
            })
        }
    })
}