import { from } from "rxjs";
import { EmptyalertComponent } from "./alerts/emptyalert/emptyalert.component";
import { GalleryComponent } from "./explore/gallery/gallery.component";
import { CarduserComponent } from "./feed/carduser/carduser.component";
import { ContactsComponent } from "./feed/contacts/contacts.component";
import { FriendsComponent } from "./feed/friends/friends.component";
import { PhotosComponent } from "./feed/photos/photos.component";
import { PortadaComponent } from "./feed/portada/portada.component";
import { PostsComponent } from "./feed/posts/posts.component";
import { HeaderComponent } from "./main/header/header.component";
import { CardheaderComponent } from "./profile/cardheader/cardheader.component";

// IMPORT COMPONENTS
export const components : any[] = [
    PostsComponent,
    PortadaComponent,
    HeaderComponent,
    PhotosComponent,
    FriendsComponent,
    CardheaderComponent,
    GalleryComponent,
    CarduserComponent,
    ContactsComponent,
    EmptyalertComponent
];

// EXPORT ALL COMPONENTS
export * from './feed/posts/posts.component';
export * from './feed/portada/portada.component'; 
export * from './main/header/header.component';
export * from './feed/photos/photos.component';
export * from './feed/friends/friends.component';
export * from './profile/cardheader/cardheader.component';
export * from './explore/gallery/gallery.component';
export * from './feed/carduser/carduser.component';
export * from './feed/contacts/contacts.component';
export * from './alerts/emptyalert/emptyalert.component';
