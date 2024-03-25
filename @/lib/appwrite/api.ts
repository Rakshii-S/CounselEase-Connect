import { v4 } from "uuid";
import { INewBuddy, INewCounsellor, INewGroup, INewPost, INewUser, IUpdateBuddy, IUpdateCounsellor, IUpdateGroup, IUpdatePost, IUpdateUser } from "../../../types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID } from "appwrite";

// user creation and login
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
            password: newAccount.password,
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

// export async function updateUserAccount(user: {
//     userid: string
// }) {
//     try {
//         console.log(user.userid);
//         const res = await fetch(`http://localhost:3000/updateUser/${user.userid}`);
//         const data = await res.json();
//         console.log(data);
//     } catch (error) {
//         return error;
//     }
// }

export async function UpdateUser(user: IUpdateUser) {
    try {
        const updatedCousellor = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.$id,
            {
                role: user.role,
                name: user.name,
                email: user.email,
                password: user.password,
                username: user.username,
                imageUrl: user.imageUrl
            })
        if (!updatedCousellor) {
            await deleteFile(user.imageId);
            throw Error;
        }
        return updatedCousellor
    } catch (error) {
        console.log(error);
    }
}

export async function saveUserToDB(user: {
    accountid: string;
    role: string,
    email: string,
    password: string,
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

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.officialPostsStorageId, fileId);
        return "ok"
    } catch (error) {
        console.log(error)
    }
}

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

export async function deletePostById(postId: any) {
    try {
        console.log(postId)
        const postInfo = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.officialPostsCollectionId,
            postId
        )
        console.log(postInfo.imageId)
        const Gfile = storage.deleteFile(appwriteConfig.officialPostsStorageId, postInfo.imageId);
        if (!Gfile) throw Error

        const post = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.officialPostsCollectionId,
            postId);

        if (!post) throw Error

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
        console.log("reached the create group method")
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

export async function uploadFileGroupProfile(file: File) {
    try {
        const uploadFile = await storage.createFile(
            appwriteConfig.profileStorageId,
            v4(),
            file
        );
        return uploadFile;
    } catch (error) {
        console.log(error)
    }
}

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

export async function getRecentGroups() {
    const groups = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.groupCollectionId,
    )
    if (!groups) throw Error
    return groups
}

export async function getGroupById(groupId: string) {
    try {
        console.log(groupId)
        const group = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupCollectionId,
            groupId
        )
        return group
    } catch (error) {
        console.log(error)
    }
}

export async function deleteGroupById(groupId: any) {
    try {
        console.log(groupId)
        const groupInfo = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupCollectionId,
            groupId
        )
        console.log(groupInfo.imageId)
        const Gfile = storage.deleteFile(appwriteConfig.profileStorageId, groupInfo.imageId);
        if (!Gfile) throw Error

        const group = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.groupCollectionId,
            groupId);

        if (!group) throw Error

    } catch (error) {
        console.log(error);
    }
}

//counsellor
export async function addCounsellor(user: INewCounsellor) {
    try {
        console.log("Entered the add counsellor!!")
        console.log(user)
        const newAccount = await account.create(
            user.userId,
            user.email,
            user.password,
            user.name
        );

        console.log(newAccount)
        console.log(user)
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const Cuser = await saveCounsellorToDB({
            accountid: user.userId,
            email: newAccount.email,
            password: user.password,
            block: user.block,
            contact: user.contact
        })
        console.log(Cuser)
        const newUser = await saveUserToDB({
            accountid: user.userId,
            role: "counsellor",
            name: user.name,
            email: user.email,
            username: user.username,
            imageUrl: avatarUrl
        });
        console.log(newUser)
        return newUser;

    } catch (error) {
        return error;
    }
}

export async function saveCounsellorToDB(user: {
    accountid: string,
    email: string,
    password: string,
    block: string,
    contact?: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.counsellorCollectionId,
            user.accountid,
            user
        )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateCounsellorU(user: IUpdateCounsellor) {
    try {
        //save post to database
        const avatarUrl = avatars.getInitials(user.name);
        const updatedCousellor = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.$id,
            {
                role: "counsellor",
                name: user.name,
                password: user.password,
                email: user.email,
                username: user.username,
                imageUrl: avatarUrl
            })
        if (!updatedCousellor) {
            await deleteFile(user.imageId);
            throw Error;
        }
        return updatedCousellor
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateCounsellorC(user: IUpdateCounsellor) {
    try {
        //save post to database
        const updatedCousellor = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.counsellorCollectionId,
            user.$id,
            {
                block: user.block,
                contact: user.contact,
                password: user.password,
                email: user.email,
                accountid: user.$id
            })
        if (!updatedCousellor) {
            await deleteFile(user.imageId);
            throw Error;
        }
        return updatedCousellor
    } catch (error) {
        console.log(error);
    }
}

//user tb
export async function getCounsellorByIdU(userId: string) {
    try {
        console.log(userId)
        const counsellor = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        )
        return counsellor
    } catch (error) {
        console.log(error)
    }
}
//counsellor tb
export async function getCounsellorByIdC(userId: string) {
    try {
        console.log(userId)
        const counsellor = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.counsellorCollectionId,
            userId
        )
        return counsellor
    } catch (error) {
        console.log(error)
    }
}

//user tb
export async function getRecentCounsellorU() {
    const counsellor = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
    )

    if (!counsellor) throw Error
    return counsellor
}
//counsellor tb
export async function getRecentCounsellorC() {
    const counsellor = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.counsellorCollectionId,
    )

    if (!counsellor) throw Error
    return counsellor
}

//buddy
export async function addBuddy(user: INewBuddy) {
    try {
        console.log("Entered the add buddy!!")
        console.log(user)
        const newAccount = await account.create(
            user.userId,
            user.email,
            user.password,
            user.name
        );

        console.log(newAccount)
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const Cuser = await saveBuddyToDB({
            accountid: user.userId,
            email: newAccount.email,
            password: user.password,
            contact: user.contact
        })
        console.log(Cuser)
        const newUser = await saveUserToDB({
            accountid: user.userId,
            password: newAccount.password,
            role: "buddy",
            name: user.name,
            email: user.email,
            username: user.username,
            imageUrl: avatarUrl
        });
        console.log(newUser)
        return newUser;

    } catch (error) {
        return error;
    }
}

export async function saveBuddyToDB(user: {
    accountid: string,
    email: string,
    password: string,
    contact?: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.buddyCollectionId,
            user.accountid,
            user
        )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateBuddyU(user: IUpdateBuddy) {
    try {
        //save post to database
        const avatarUrl = avatars.getInitials(user.name);
        const updatedBuddy = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.$id,
            {
                role: "buddy",
                name: user.name,
                email: user.email,
                username: user.username,
                imageUrl: avatarUrl
            })
        if (!updatedBuddy) {
            await deleteFile(user.imageId);
            throw Error;
        }
        return updatedBuddy
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateBuddyB(user: IUpdateBuddy) {
    try {
        //save post to database
        const updatedBuddy = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.buddyCollectionId,
            user.$id,
            {
                contact: user.contact,
                password: user.password,
                email: user.email,
                accountid: user.$id
            })
        if (!updatedBuddy) {
            await deleteFile(user.imageId);
            throw Error;
        }
        return updatedBuddy
    } catch (error) {
        console.log(error);
    }
}

export async function getBuddyByIdU(userId: string) {
    try {
        console.log(userId)
        const buddy = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        )
        return buddy
    } catch (error) {
        console.log(error)
    }
}
//buddy tb
export async function getBuddyByIdB(userId: string) {
    try {
        console.log(userId)
        const buddy = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.buddyCollectionId,
            userId
        )
        return buddy
    } catch (error) {
        console.log(error)
    }
}

//user tb
export async function getRecentBuddyU() {
    const buddy = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
    )

    if (!buddy) throw Error
    return buddy
}

export async function getRecentBuddyB() {
    const buddy = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.buddyCollectionId,
    )

    if (!buddy) throw Error
    return buddy
}