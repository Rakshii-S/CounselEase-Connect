import { INewUser } from "../../../types";
import { account, appwriteConfig, avatars, databases } from "./config";

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