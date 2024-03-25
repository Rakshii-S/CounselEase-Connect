export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};

//USER SECTION
export type IUpdateUser = {
    password: any;
    $id: any,
    userId: string;
    email: string;
    name: string;
    username: string;
    role: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type INewPost = {
    userId: string;
    caption: string;
    email: string;
    file: File[];
    tags?: string;
};

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUser = {
    $id: any;
    id: string;
    role: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
};


export type INewUser = {
    userid: string;
    name: string;
    email: string;
    username: string;
    password: string;
};

//GROUPS SECTION
export type INewGroup = {
    userId: string;
    counsellorId: string;
    buddyId: string;
    name: string;
    file: File[];
    bio?: string;
};

export type IUpdateGroup = {
    groupId: string;
    imageUrl: any;
    imageId: any;
    counsellorId: string;
    buddyId: string;
    name: string;
    file: File[];
    bio?: string;
}

//COUNSELLOR SECTION
export type INewCounsellor = {
    userId: string;
    role: string;
    name: string;
    username: string;
    email: string;
    password: string;
    imageUrl: any;
    block: string;
    contact: string;
    bio: string;
}

export type IUpdateCounsellor = {
    $id: any;
    file: File[];
    name: string;
    username: string;
    email: string;
    password: string;
    imageUrl?: any;
    imageId?: any,
    block: string;
    contact: string;
    bio: string;
}

// BUDDY SECTION
export type INewBuddy = {
    userId: string;
    role: string;
    name: string;
    username: string;
    email: string;
    password: string;
    imageUrl: any;
    contact: string;
    bio: string;
}

export type IUpdateBuddy = {
    $id: any;
    file: File[];
    name: string;
    username: string;
    email: string;
    password: string;
    imageUrl?: any;
    imageId?: any,
    contact: string;
    bio: string;
}