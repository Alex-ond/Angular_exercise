import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostCommentsComponent } from './post-comments.component';
import { RouterModule } from '@angular/router';
import { initialState } from '../../store/blog.state';
import { PostComment } from '../../models/post-comment';
import { MemoizedSelector } from '@ngrx/store';
import * as Selectors from '../../store/blog.selectors';
import { createSingleCold, queryByCss, queryByDirective } from '../../../../core/test-utils.spec';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../../../../shared/shared.module';
import { testPostComments } from '../../blog.test-data.spec';

describe('PostCommentsComponent', () => {
    let component: PostCommentsComponent;
    let fixture: ComponentFixture<PostCommentsComponent>;
    let store: MockStore;

    let postCommentsFetchingErrorMessageSelector: MemoizedSelector<object, string>;
    let isPostCommentsLoadingSelector: MemoizedSelector<object, boolean>;
    let postCommentsSelector: MemoizedSelector<object, PostComment[]>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostCommentsComponent],
            providers: [
                provideMockStore(
                    {
                        initialState: initialState
                    })
            ],
            imports: [
                MatProgressBarModule,
                RouterModule.forRoot([]),
                SharedModule
            ]
        })
            .compileComponents();

        store = TestBed.inject(MockStore);
        postCommentsFetchingErrorMessageSelector =
            store.overrideSelector(Selectors.postCommentsFetchingErrorMessageSelector, '');
        isPostCommentsLoadingSelector =
            store.overrideSelector(Selectors.isPostCommentsLoadingSelector, false);
        postCommentsSelector = store.overrideSelector(Selectors.postCommentsSelector, []);

        fixture = TestBed.createComponent(PostCommentsComponent);
        component = fixture.componentInstance;
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should update errorMessage$ when selector data changes', () => {
        postCommentsFetchingErrorMessageSelector.setResult('testError');

        expect(component.errorMessage$).toBeObservable(createSingleCold('testError'));
    })

    it('should update isLoading$ when selector data changes', () => {
        isPostCommentsLoadingSelector.setResult(true);

        expect(component.isLoading$).toBeObservable(createSingleCold(true));
    })

    it('should update posts$ when selector data changes', () => {
        postCommentsSelector.setResult(testPostComments);

        expect(component.postComments$).toBeObservable(createSingleCold(testPostComments));
    })

    it('should show error component when errorMessage$ is not empty', () => {
        postCommentsFetchingErrorMessageSelector.setResult('testError');
        fixture.detectChanges();

        expect(queryByDirective(fixture, ErrorComponent)).not.toBeNull()
    })

    it('should show progress bar component when isLoading$ is true', () => {
        isPostCommentsLoadingSelector.setResult(true);
        fixture.detectChanges();

        expect(queryByCss(fixture, 'mat-progress-bar')).not.toBeNull()
    })
});
