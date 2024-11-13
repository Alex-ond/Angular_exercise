import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as Selectors from '../../../store/blog.selectors';
import { BlogState } from '../../../store/blog.state';
import { fetchPostCommentsByPostId } from '../../../store/blog.actions';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent implements OnInit, OnDestroy{
  postComments$ = this.store.select(Selectors.postCommentsSelector);
  isLoading$ = this.store.select(Selectors.isPostCommentsLoadingSelector);
  errorMessage$ = this.store.select(Selectors.postCommentsFetchingErrorMessageSelector);

  paramsSubscription?: Subscription;

  constructor(private store: Store<BlogState>, private route: ActivatedRoute) {}

  ngOnInit(): void {    
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          const postId = +params['id'];
          this.store.dispatch(fetchPostCommentsByPostId(postId));
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription?.unsubscribe();
  }
}
