import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Selectors from '../../store/blog.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogState } from '../../store/blog.state';
import { fetchPostCommentsByPostId } from '../../store/blog.actions';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent implements OnInit {
  postComments$ = this.store.select(Selectors.postCommentsSelector);
  isLoading$ = this.store.select(Selectors.isPostCommentsLoadingSelector);
  errorMessage$ = this.store.select(Selectors.postCommentsFetchingErrorMessageSelector);

  constructor(private store: Store<BlogState>, private route: ActivatedRoute, private destroyRef: DestroyRef) {}

  ngOnInit(): void {    
      this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
        (params: Params) => {
          const postId = +params['id'];
          this.store.dispatch(fetchPostCommentsByPostId(postId));
        }
      );
  }
}