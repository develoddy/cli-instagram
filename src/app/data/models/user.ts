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



































// export class User {
//     email?: string;
//     fullname?: string;
//     profileImageURL?: string;
//     username?: string;
//     uid?: string;
//     displayName?: string;
//     photoURL?: string;
//     emailVerified?: boolean;
//     stats?: UserStats;
//     isFollwed?: boolean = false;

//     /*constructor(
//         email: string,
//         fullname: string,
//         profileImageURL: string,
//         username: string,
//         uid: string,
//         stats: UserStats
//      ) {
//         this.email = email;
//         this.fullname = fullname;
//         this.profileImageURL = profileImageURL;
//         this.username = username;
//         this.uid = uid;
//         this.stats = stats;
//     }*/
// }

/*
 -- SWIFT ---
 struct User {
    let email: String
    let fullname: String
    let profileImageURL: String
    var username: String
    let uid: String
    let type: UserFollowType
    
    var isFollwed = false
    
    var stats: UserStats!
    
    var isCurrentUser: Bool {
        // Se compueba si el uid es igual al uid que está logueado en la App
        return Auth.auth().currentUser?.uid == uid
    }
    
    init(dictionary: [String: Any]) {
        self.email = dictionary["email"] as? String ?? ""
        self.fullname = dictionary["lastname"] as? String ?? ""
        self.profileImageURL = dictionary["profileImageURL"] as? String ?? ""
        self.username = dictionary["username"] as? String ?? ""
        self.uid = dictionary["uid"] as? String ?? ""
        self.stats = UserStats(followers: 0, following: 0, posts: 0)
        self.type = UserFollowType(rawValue: dictionary["type"] as? Int ?? 0) ?? .follow
    }
}

struct UserStats {
    let followers: Int
    let following: Int
    let posts: Int
}
*/

/* 
    interface UserInfo {
        displayName: string | null;
        email: string | null;
        phoneNumber: string | null;
        photoURL: string | null;
        providerId: string;
        uid: string;
    }
*/



export class User {
    fullname: string | null;
    email: string | null;
    phoneNumber: string | null;
    profileImageURL: string | null;
    username: string | null;
    uid: string | null;
    emailVerified: boolean;
    
    stats?: UserStats;
    isFollwed?: boolean = false;
}

export interface UserStats {
    followers: number;
    followings: number;
    posts: number;
}