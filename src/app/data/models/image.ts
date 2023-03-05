
export interface Image {
    title: string;
    src: string;
    postimage: Postimage;
}

export interface Postimage {
    postimagePostID: null;
    postimageImageID: null;
    createdAt: null;
    updatedAt: null;
    postID: number;
    imageID: number;
}