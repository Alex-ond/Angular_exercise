import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PostComponent } from './post.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';
import { queryAllByCss, queryByCss, queryAllByDirective, queryDebugElementAllByCss } from '../../../../core/test-utils.spec';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { testPost } from '../../blog.test-data.spec';

describe('PostComponent', () => {

  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostComponent
      ],
      providers: [
        provideMockStore({})
      ],
      imports: [
        MatCardModule,
        RouterModule,
        SharedModule,
        RouterModule.forRoot([
          { path: 'blog/:id/comments', component: PostCommentsComponent, title: 'Post comments' }
        ]
        )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = testPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    const spanElement = queryByCss(fixture, 'mat-card-title>span').nativeElement as HTMLSpanElement;

    expect(spanElement.innerText).toBe(testPost.title);
  });

  it('should show user name', () => {
    const htmlElement = queryByCss(fixture, 'mat-card-subtitle').nativeElement as HTMLElement;

    expect(htmlElement.innerText).toBe(testPost.username!);
  });

  it('should show body', () => {
    const htmlElement = queryByCss(fixture, 'mat-card-content').nativeElement as HTMLElement;

    expect(htmlElement.innerText).toBe(testPost.body);
  });

  it('should show readonly rating component', () => {
    const ratingComponent = queryAllByDirective(fixture, RatingComponent)[0].context as RatingComponent;

    expect(ratingComponent.readonly).toBeTrue();
  });

  it('should show 2 rating components', () => {
    const ratingComponents = queryAllByDirective(fixture, RatingComponent);

    expect(ratingComponents).toHaveSize(2);
  });

  it('should do not show rating component when rating < 1', () => {
    const postWithoutRating = { ...testPost, rating: 0 };
    fixture.componentRef.setInput('post', postWithoutRating);
    fixture.detectChanges();
    const ratingComponents = queryAllByDirective(fixture, RatingComponent);

    expect(ratingComponents).toHaveSize(1);
  });

  it('should return valid comments url', () => {
    expect(component.createCommentsUrl(1)).toBe('/blog/1/comments');
  });

  it('should show disabled Vote button', () => {
    const buttonElement = queryByCss(fixture, '.ratingButton').nativeElement as HTMLButtonElement;

    expect(buttonElement.disabled).toBeTrue();
  });

  it('should enable Vote button after click on rating', () => {
    const secondRatingDebugElement = queryAllByCss(fixture, 'app-rating')[1];
    const htmlElement = queryDebugElementAllByCss(secondRatingDebugElement, 'mat-icon')[2].nativeElement as HTMLElement;
    htmlElement.click();
    fixture.detectChanges();

    const buttonElement = queryByCss(fixture, '.ratingButton').nativeElement as HTMLButtonElement;
    expect(buttonElement.disabled).toBeFalse();
  });
});