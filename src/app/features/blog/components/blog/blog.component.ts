import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/blog.selectors';
import { BlogState } from '../../store/blog.state';
import { fetchPosts } from '../../store/blog.actions';
import { Post } from '../../models/post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  posts$ = this.store.select(Selectors.postsSelector);
  isLoading$ = this.store.select(Selectors.isPostsLoadingSelector);
  errorMessage$ = this.store.select(Selectors.postsFetchingErrorMessageSelector);

  constructor(private store: Store<BlogState>) { }

  ngOnInit() {
    this.store.dispatch(fetchPosts());
  }

  trackByFn(_: number, post: Post) {
    return post.id;
  }
}