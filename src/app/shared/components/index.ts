import { from } from "rxjs";
import { EmptyPhotosComponent } from "./alerts/empty-photos/empty-photos.component";
import { EmptyalertComponent } from "./alerts/emptyalert/emptyalert.component";
import { GalleryComponent } from "./explore/gallery/gallery.component";
import { CarduserComponent } from "./feed/carduser/carduser.component";
import { ContactsComponent } from "./feed/contacts/contacts.component";
import { FriendsComponent } from "./feed/friends/friends.component";
import { PhotosComponent } from "./feed/photos/photos.component";
import { PortadaComponent } from "./feed/portada/portada.component";
import { PostsComponent } from "./feed/posts/posts.component";
import { CardInfoUserComponent } from "./loaders/card-info-user/card-info-user.component";
import { LoaderContactsComponent } from "./loaders/loader-contacts/loader-contacts.component";
import { LoaderPhotosComponent } from "./loaders/loader-photos/loader-photos.component";
import { PostsLoadersComponent } from "./loaders/posts-loaders/posts-loaders.component";
import { SpinnerComponent } from "./loaders/spinner/spinner.component";
import { HeaderComponent } from "./main/header/header.component";
import { CardheaderComponent } from "./profile/cardheader/cardheader.component";
import { UserprofileComponent } from "./profile/userprofile/userprofile.component";
import { AccountComponent } from "./onboarding/account/account.component";
import { BirthdayComponent } from "./onboarding/birthday/birthday.component";
import { FooterloginComponent } from "./onboarding/footerlogin/footerlogin.component";
import { CodephoneComponent } from "./onboarding/codephone/codephone.component";
import { PhonenumberComponent } from "./onboarding/phonenumber/phonenumber.component";
import { ProfilePictureComponent } from "./onboarding/profile-picture/profile-picture.component";
import { PasswordresetComponent } from "./onboarding/passwordreset/passwordreset.component";
import { ModaladdpostComponent } from "./modals/modaladdpost/modaladdpost.component";
import { TabsComponent } from './profile/tabs/tabs.component';
import { ProfilepostsComponent } from './profile/profileposts/profileposts.component';


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
    EmptyalertComponent,
    EmptyPhotosComponent,
    PostsLoadersComponent,
    CardInfoUserComponent,
    LoaderContactsComponent,
    SpinnerComponent,
    LoaderPhotosComponent,
    UserprofileComponent,
    AccountComponent,
    BirthdayComponent,
    FooterloginComponent,
    CodephoneComponent,
    PhonenumberComponent,
    ProfilePictureComponent,
    PasswordresetComponent,
    ModaladdpostComponent,
    TabsComponent,
    ProfilepostsComponent
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
export * from './alerts/empty-photos/empty-photos.component';
export * from './loaders/posts-loaders/posts-loaders.component';
export * from './loaders/card-info-user/card-info-user.component';
export * from './loaders/loader-contacts/loader-contacts.component';
export * from './loaders/spinner/spinner.component';
export * from './loaders/loader-photos/loader-photos.component';
export * from './profile/userprofile/userprofile.component';
export * from './onboarding/account/account.component';
export * from './onboarding/birthday/birthday.component';
export * from './onboarding/footerlogin/footerlogin.component';
export * from './onboarding/codephone/codephone.component';
export * from './onboarding/phonenumber/phonenumber.component';
export * from './onboarding/profile-picture/profile-picture.component';
export * from './onboarding/passwordreset/passwordreset.component';
export * from './modals/modaladdpost/modaladdpost.component';
export * from './profile/tabs/tabs.component';
export * from './profile/profileposts/profileposts.component';