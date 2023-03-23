// import { Conversation } from "./conversation";

/*
export interface ReqResUser {
    users: ResponseUser;
    followings: number[];
    followeds: number[];
}

export interface ResponseUser {
    totalItems:  number;
    profiles:    User[];
    totalPages:  number;
    currentPage: number;
}

/*export interface User {
    id: number;
    name: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    code?: string;
    is_active?: boolean;
    is_admin?: boolean;
    created_at?: string;
    updated_at?: string;
    profile?: Profile;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}


export interface Profile {
    image_header: string;
    bio: string;
}*/


export class User {
    email?: string;
    fullname?: string;
    profileImageURL?: string;
    username?: string;
    uid?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    stats?: UserStats;


    constructor(
        email: string,
        fullname: string,
        profileImageURL: string,
        username: string,
        uid: string,
        stats: UserStats
     ) {
        this.email = email;
        this.fullname = fullname;
        this.profileImageURL = profileImageURL;
        this.username = username;
        this.uid = uid;
        this.stats = stats
    }
}

export class UserStats {
    followers: number;
    following: number;
    posts: number;
}