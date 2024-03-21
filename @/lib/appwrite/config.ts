import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: '65eea61f1a70e314b9a4',
    databaseId: '65eeb8ce999889bf3cc1',
    officialPostsStorageId: '65f1b3e1e28a294d7c71',
    profileStorageId: '65f1b4db3070ff8db8e7',
    userCollectionId: '65eebe5416d4027d3511',
    officialPostsCollectionId: '65f1afd8c78ab947dfc6',
    groupCollectionId: '65fc5a15bb58504703b5'
}

export const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);