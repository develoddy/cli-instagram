import { from } from "rxjs";
import { PortadaComponent } from "./feed/portada/portada.component";
import { PostsComponent } from "./feed/posts/posts.component";
import { HeaderComponent } from "./main/header/header.component";

// IMPORT COMPONENTS

export const components : any[] = [
    PostsComponent,
    PortadaComponent,
    HeaderComponent
];

// EXPORT ALL COMPONENTS
export * from './feed/posts/posts.component';
export * from './feed/portada/portada.component'; 
export * from './main/header/header.component';
