import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog/blog.component';
import { PostCommentsComponent } from './blog/blog/post/post-comments/post-comments.component';
import { GuestBookComponent } from './guest-book/guest-book/guest-book.component';

export const routes: Routes = [
    { path: 'blog', component: BlogComponent, title: 'Blog' },
    { path: 'blog/:id/comments', component: PostCommentsComponent, title: 'Post comments' },
    { path: 'guestbook', component: GuestBookComponent, title: 'Guest book' },  
    { path: '**', redirectTo: '/blog', pathMatch: 'full' }
  ];
