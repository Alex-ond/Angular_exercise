import { Routes } from '@angular/router';
import { GuestBookComponent } from './guest-book/guest-book/guest-book.component';
import { PostCommentsComponent } from './features/blog/blog/components/post-comments/post-comments.component';
import { BlogComponent } from './features/blog/blog/components/blog/blog.component';

export const routes: Routes = [
    { path: 'blog', component: BlogComponent, title: 'Blog' },
    { path: 'blog/:id/comments', component: PostCommentsComponent, title: 'Post comments' },
    { path: 'guestbook', component: GuestBookComponent, title: 'Guest book' },  
    { path: '**', redirectTo: '/blog', pathMatch: 'full' }
  ];
