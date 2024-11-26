import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Input()
  starCount = 5;

  @Input()
  value?: number;

  @Input()
  readonly = false;

  @Input()
  size: 'normal' | 'small' = 'normal';

  onClick(index: number) {   
    if (this.readonly) {
      return;
    }    
    this.value = index + 1;
  }

  getIcon(index: number): 'star' | 'star_border' {    
    if (!this.value) {
      return 'star_border';
    }
    return index < this.value ? 'star' : 'star_border';
  }
}