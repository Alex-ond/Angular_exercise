import { Routes } from '@angular/router';
import { BlogComponent } from './features/blog/components/blog/blog.component';
import { PostCommentsComponent } from './features/blog/components/post-comments/post-comments.component';
import { GuestBookComponent } from './features/guest-book/components/guest-book/guest-book.component';

export const routes: Routes = [
  { path: 'blog', component: BlogComponent, title: 'Blog' },
  { path: 'blog/:id/comments', component: PostCommentsComponent, title: 'Post comments' },
  { path: 'guestbook', component: GuestBookComponent, title: 'Guest book' },
  { path: '**', redirectTo: '/blog', pathMatch: 'full' }
];
