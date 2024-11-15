import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  @Input({required: true}) 
  post!: Post;

  createCommentsUrl(postId: number) : string {
    return `/blog/${postId}/comments`;
  }
}
