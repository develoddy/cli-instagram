import { Conversation } from "./conversation";

export interface ReqResPosts {
    ResPostImages: ResPostImages;
    commentCounts: CommentCounts[];
}

export interface CommentCounts {
    postId:      number;
    comentarios: number;
}


export interface ResPostImages {
    totalItems:  number;
    posts:       Post[];
    totalPages:  number;
    currentPage: number;
    limit:       number;
}

export interface Post {
    id          : number;
    content     : string;
    created_at  : string;
    userId      : number;
    user        : User;
    images?     : Image[];
    comments    : Comment[];
    hearts?      : Heart[];
}

export interface Heart {
    id:      number;
    ref_id:  number;
    user_id: number;
    user:    User;
}

export interface Comment {
    id:        number;
    userId:    number;
    commentId: number;
    content:   string;
    user:      User;
}

export interface CommentPost {
    type_id: number;
    ref_id: number;
    user_id: number;
    content: string
    comment_id: number;
    created_at: string;
    updated_at: string;
    postId: number;
    userId: number;
}

export interface User {
    id?:         number;
    name?:       string;
    lastname?:   string;
    username?:   string;
    email?:      string;
    password?:   string;
    code?:       string;
    is_active?:  boolean;
    is_admin?:   boolean;
    created_at?: string;
    updated_at?: string;
    profile?  : Profile;
}

export interface Profile {
    image_header : string;
    bio          : string;
}

export class Image {
    constructor(
        public id           : number,
        public title        : string,
        public content      : string,
        public marginLeft   : number,
        public link         : string,
        public post_image   : PostImage
    ){}
}

export class PostImage {
    constructor(
        public postId:  number,
        public imageId: number,
    ) {}
}

/*export interface Follow {
    id?: number,
    user_id : number,
    followed_id : number,
    created_at?: string,
    updated_at?: string,
}*/
export interface Follow {
    id?:       number;
    user_id?: number,
    followed_id? : number,
    name?:     string;
    username?: string;
    user?:  User;
}

// FOLLOWERS AND FOLLOWINGS
export interface ReqResFollowers {
    totalItems:  number;
    follows:     Follow[];
    totalPages:  number;
    currentPage: number;
}




// IMAGES
export interface ReqResImages {
    totalItems:  number;
    posts:       UserImages[];
    totalPages:  number;
    currentPage: number;
    limit:       number;
}

export interface UserImages {
    title: string;
    content: string;
    user:  User;
}









// User Follow
export interface ResUF__ {
    user:   ResUF__User;
    follow: ResUF__Follow;
}

export interface ResUF__Follow {
    user_id:     number;
    followed_id: number;
}

export interface ResUF__User {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    profile:  Profile;
}

// ==== Follow =====
export interface ResUsers__ {
    res_users:       ResUsers__total;
    users_following: number[];
    users_followed:  number[];
}

export interface ResUsers__total {
    totalItems:  number;
    profiles:    ResUsers__user[];
    totalPages:  number;
    currentPage: number;
}

export interface ResUsers__user {
    id:       number;
    username: string;
    profile:  ResUsers__profile;
}

export interface ResUsers__profile {
    bio:          string;
    image_header: string;
}

// ==== Messages =====
export interface ResMessagesFollows {
    follows: Follow[];
}

export interface ResMessagesFollow {
    id:          number;
    user_id:     number;
    followed_id: number;
    created_at:  Date;
    updated_at:  Date;
    user:        User;
}

export interface ResMessagesFollowUser {
    id:   number;
    name: string;
}



// Messages emit
//export interface ResEmitMessages {

export interface ResEmitMessages {
    totalItems:  number;
    user:        ResEmitMessagesUser[];
    totalPages:  number;
    currentPage: number;
}

export interface ResEmitMessagesUser {
    sender_id:   number;
    receptor_id: number;
    user:        ResEmitMessageUser;
    messages:    ResEmitMessage[];
}

export interface ResEmitMessageUser {
    id:    number;
    name:  string;
    email: string;
    profile: ResEmitProfile
}

export interface ResEmitMessage {
    content: string;
    user:    ResEmitMessageUser;
}

export interface ResEmitProfile {
    image_header: string;
}
    



