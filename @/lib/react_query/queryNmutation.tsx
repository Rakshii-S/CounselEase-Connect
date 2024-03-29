import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { INewBuddy, INewCounsellor, INewGroup, INewPost, INewUser, IUpdateBuddy, IUpdateCounsellor, IUpdateGroup, IUpdatePost, IUpdateUser } from '../../../types';
import { UpdateBuddyB, UpdateBuddyU, UpdateCounsellorC, UpdateCounsellorU, UpdateUser, addBuddy, addCounsellor, createGroup, createPost, createUserAccount, getBuddyByIdB, getBuddyByIdU, getCounsellorByIdC, getCounsellorByIdU, getCurrentUser, getGroupById, getPostById, getRecentBuddyB, getRecentBuddyU, getRecentCounsellorC, getRecentCounsellorU, getRecentGroups, getRecentPosts, likePost, signInAccount, signOutAccount, updateGroup, updatePost } from '../appwrite/api';
import { QUERY_KEYS } from './queryKeys';

//create new user account 
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user:INewUser) => createUserAccount(user)
    })
}

// export const useUpdateUserAccount = () => {
//     return useMutation({
//         mutationFn: (user:{ userid: string}) => updateUserAccount(user)
//     })
// }

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

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

// POSTS SECTION
export const useCreatePost = () => {
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
    console.log("entered the tanstack")
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

export const useGetRecentGroup= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_GROUPS],
        queryFn: getRecentGroups,
    })
}

export const useGetGroupById = (groupId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_GROUP_BY_ID, groupId],
        queryFn: () => getGroupById(groupId),
        enabled:  !!groupId
    })
}

//COUNSELLOR SECTION
export const useAddCounsellor = () => {
    return useMutation({
        mutationFn: (user:INewCounsellor) => addCounsellor(user)
    })
}

export const useUpdateCounsellorU = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateCounsellor) => UpdateCounsellorU(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS. GET_COUNSELLOR_BY_ID_U, data?.$id]
            })
        }
    })
}

export const useUpdateCounsellorC = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateCounsellor) => UpdateCounsellorC(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS. GET_COUNSELLOR_BY_ID_C, data?.$id]
            })
        }
    })
}

export const useGetRecentCounsellorU= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_COUNSELLORS_U],
        queryFn: getRecentCounsellorU,
    })
}

export const useGetRecentCounsellorC= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_COUNSELLORS_C],
        queryFn: getRecentCounsellorC,
    })
}

export const useGetCounsellorByIdU = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_COUNSELLOR_BY_ID_U, userId],
        queryFn: () => getCounsellorByIdU(userId),
        enabled:  !!userId
    })
}

export const useGetCounsellorByIdC = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_COUNSELLOR_BY_ID_C, userId],
        queryFn: () => getCounsellorByIdC(userId),
        enabled:  !!userId
    })
}

// BUDDY SECTION
export const useAddBuddy = () => {
    return useMutation({
        mutationFn: (user:INewBuddy) => addBuddy(user)
    })
}

export const useUpdateBuddyU = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateBuddy) => UpdateBuddyU(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS. GET_BUDDY_BY_ID_U, data?.$id]
            })
        }
    })
}

export const useUpdateBuddyB = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateBuddy) => UpdateBuddyB(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS. GET_BUDDY_BY_ID_B, data?.$id]
            })
        }
    })
}

export const useGetBuddyByIdU = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BUDDY_BY_ID_U, userId],
        queryFn: () => getBuddyByIdU(userId),
        enabled:  !!userId
    })
}

export const useGetBuddyByIdB = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BUDDY_BY_ID_B, userId],
        queryFn: () => getBuddyByIdB(userId),
        enabled:  !!userId
    })
}

export const useGetRecentBuddyU= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_BUDDY_U],
        queryFn: getRecentBuddyU,
    })
}

export const useGetRecentBuddyB= () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_BUDDY_B],
        queryFn: getRecentBuddyB,
    })
}


export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateUser) => UpdateUser(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS. GET_USER_BY_ID, data?.$id]
            })
        }
    })
}