import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCommentComponent } from './post-comment.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { queryByCss } from '../../../../core/test-utils.spec';
import { testPostComment } from '../../blog.test-data.spec';

describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentComponent],
      providers: [
        provideMockStore({})
      ],
      imports: [
        MatCardModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    component.postComment = testPostComment;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should show name', () => {
    const htmlElement = queryByCss(fixture, 'mat-card-title').nativeElement as HTMLElement;

    expect(htmlElement.innerText).toBe(testPostComment.name);
  })

  it('should show email', () => {
    const htmlElement = queryByCss(fixture, 'mat-card-subtitle').nativeElement as HTMLElement;

    expect(htmlElement.innerText).toBe(testPostComment.email);
  })

  it('should show body', () => {
    const htmlElement = queryByCss(fixture, 'mat-card-content').nativeElement as HTMLElement;

    expect(htmlElement.innerText).toBe(testPostComment.body);
  })
});
