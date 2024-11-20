import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostComment } from '../../models/post-comment';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentComponent {
  @Input({ required: true })
  postComment!: PostComment;
}
