import { v4 } from "uuid";
import { INewGroup, INewPost, INewUser, IUpdateGroup, IUpdatePost } from "../../../types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            user.userid,
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountid: user.userid,
            role: "student",
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        });
        return newUser;

    } catch (error) {
        return error;
    }
}

export async function saveUserToDB(user: {
    accountid: string;
    role: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.accountid,
            user
        )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: {
    email: string;
    password: string
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        console.log(currentAccount.$id)
        if (!currentAccount) throw Error;
        const currentUser = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            currentAccount.$id
        );
        if (!currentUser) throw Error;
        return currentUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error)
    }
}

//official posts 
export async function createPost(post: INewPost) {
    try {
        //upload image to storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;

        //Get file url
        const fileUrl = storage.getFileView(
            appwriteConfig.officialPostsStorageId,
            uploadedFile.$id);
        if (!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;
        }
        console.log(fileUrl);
        // convert tags into an array
        const tags = post.tags?.replace(/ /g, '').split(',') || [];

        //save post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.officialPostsCollectionId,
            v4(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                email: post.email,
                tags: tags
            }
        )
        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }
        return newPost
    } catch (error) {
        console.log(error);
    }
}

//official posts 
export async function uploadFile(file: File) {
    try {
        const uploadFile = await storage.createFile(
            appwriteConfig.officialPostsStorageId,
            ID.unique(),
            file
        );
        return uploadFile;
    } catch (error) {
        console.log(error)
    }
}

//official posts 
export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.officialPostsStorageId, fileId);
        return "ok"
    } catch (error) {
        console.log(error)
    }
}

//official posts 
export async function updatePost(post: IUpdatePost) {
    try {
        const hasFileToUpdate = post.file.length > 0;
        try {
            let image = {
                imageUrl: post.imageUrl,
                imageId: post.imageId
            }
            if (hasFileToUpdate) {
                //upload image to storage
                const uploadedFile = await uploadFile(post.file[0]);
                if (!uploadedFile) throw Error;

                //Get file url
                const fileUrl = storage.getFileView(
                    appwriteConfig.officialPostsStorageId,
                    uploadedFile.$id);
                if (!fileUrl) {
                    deleteFile(uploadedFile.$id);
                    throw Error;
                }
                image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
            }
            // convert tags into an array
            const tags = post.tags?.replace(/ /g, '').split(',') || [];

            //save post to database
            const updatedPost = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.officialPostsCollectionId,
                post.postId,
                {
                    caption: post.caption,
                    imageUrl: image.imageUrl,
                    imageId: image.imageId,
                    location: post.location,
                    tags: tags
                })
            if (!updatedPost) {
                await deleteFile(post.imageId);
                throw Error;
            }
            return updatedPost
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.officialPostsCollectionId,
    )
    if (!posts) throw Error
    return posts
}

export async function likePost(postId: string, likeArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.officialPostsCollectionId,
            postId,
            {
                likes: likeArray
            }
        )
        if (!updatedPost) throw Error;
        return updatedPost;
    } catch (error) {
        console.log(error)
    }
}

export async function getPostById(postId: string) {
    try {
        console.log(postId)
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.officialPostsCollectionId,
            postId
        )
        return post
    } catch (error) {
        console.log(error)
    }
}

//GROUP SECTION
export async function createGroup(group: INewGroup) {
    try {
        //upload image to storage
        const uploadedFile = await uploadFileGroupProfile(group.file[0]);
        if (!uploadedFile) throw Error;

        //Get file url
        const fileUrl = storage.getFileView(
            appwriteConfig.profileStorageId,
            uploadedFile.$id);
        if (!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;
        }
        console.log(fileUrl);

        //save post to database
        const newGroup = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupCollectionId,
            v4(),
            {

                name: group.name,
                bio: group.bio,
                counsellorId: group.counsellorId,
                buddyId: group.buddyId,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id
            }
        )
        if (!newGroup) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }
        return newGroup
    } catch (error) {
        console.log(error);
    }
}

//group 
export async function uploadFileGroupProfile(file: File) {
    try {
        const uploadFile = await storage.createFile(
            appwriteConfig.profileStorageId,
            ID.unique(),
            file
        );
        return uploadFile;
    } catch (error) {
        console.log(error)
    }
}

//group 
export async function deleteFileGroup(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.profileStorageId, fileId);
        return "ok"
    } catch (error) {
        console.log(error)
    }
}

export async function updateGroup(group: IUpdateGroup) {
    try {
        const hasFileToUpdate = group.file.length > 0;
        try {
            let image = {
                imageUrl: group.imageUrl,
                imageId: group.imageId
            }
            if (hasFileToUpdate) {
                //upload image to storage
                const uploadedFile = await uploadFile(group.file[0]);
                if (!uploadedFile) throw Error;

                //Get file url
                const fileUrl = storage.getFileView(
                    appwriteConfig.profileStorageId,
                    uploadedFile.$id);
                if (!fileUrl) {
                    deleteFileGroup(uploadedFile.$id);
                    throw Error;
                }
                image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
            }

            //save group to database
            const updatedGroup = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.groupCollectionId,
                group.groupId,
                {
                    name: group.name,
                    bio: group.bio,
                    counsellorId: group.counsellorId,
                    buddyId: group.buddyId,
                    imageUrl: image.imageUrl,
                    imageId: image.imageId
                })
            if (!updatedGroup) {
                await deleteFileGroup(group.imageId);
                throw Error;
            }
            return updatedGroup
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}