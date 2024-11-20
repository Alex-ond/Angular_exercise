import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { Store } from '@ngrx/store';
import { BlogState } from '../../store/blog.state';
import { vote } from '../../store/blog.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  @Input({ required: true })
  post!: Post;

  constructor(private store: Store<BlogState>) { }

  createCommentsUrl(postId: number): string {
    return `/blog/${postId}/comments`;
  }

  onVote(postId: number, rating: number) {
    this.store.dispatch(vote({ postId, rating }));
  }
}
