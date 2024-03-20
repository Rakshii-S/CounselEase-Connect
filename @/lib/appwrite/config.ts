import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: '65eea61f1a70e314b9a4',
    databaseId: '65eeb8ce999889bf3cc1',
    userCollectionId: '65eebe5416d4027d3511'
}

export const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);