// import { Conversation } from "./conversation";


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

export interface User {
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

export interface Profile {
    image_header: string;
    bio: string;
}

