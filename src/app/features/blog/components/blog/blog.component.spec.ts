import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import * as Selectors from '../../store/blog.selectors';
import { initialState } from '../../store/blog.state';
import { RouterModule } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { Post } from '../../models/post';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../../../../shared/shared.module';
import { createSingleCold, queryByDirective } from '../../../../core/test-utils.spec';
import { testPosts } from '../../blog.test-data.spec';

describe("BlogComponent", () => {
    let fixture: ComponentFixture<BlogComponent>;
    let component: BlogComponent;
    let store: MockStore;

    let postsFetchingErrorMessageSelector: MemoizedSelector<object, string>;
    let isPostsLoadingSelector: MemoizedSelector<object, boolean>;
    let postsSelector: MemoizedSelector<object, Post[]>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BlogComponent
            ],
            providers: [
                provideMockStore(
                    {
                        initialState: initialState
                    }),
                provideAnimations(),
            ],
            imports: [
                MatInputModule,
                MatSelectModule,
                RouterModule,
                MatProgressBarModule,
                SharedModule
            ],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        postsFetchingErrorMessageSelector =
            store.overrideSelector(Selectors.postsFetchingErrorMessageSelector, '');
        isPostsLoadingSelector =
            store.overrideSelector(Selectors.isPostsLoadingSelector, false);
        postsSelector = store.overrideSelector(Selectors.postsSelector, []);

        fixture = TestBed.createComponent(BlogComponent);
        component = fixture.componentInstance;
    })

    it("should create", () => {
        expect(component).toBeTruthy();
    })

    it('should update errorMessage$ when selector data changes', () => {
        postsFetchingErrorMessageSelector.setResult('testError');

        expect(component.errorMessage$).toBeObservable(createSingleCold('testError'));
    })

    it('should update isLoading$ when selector data changes', () => {
        isPostsLoadingSelector.setResult(true);

        expect(component.isLoading$).toBeObservable(createSingleCold(true));
    })

    it('should update posts$ when selector data changes', () => {
        postsSelector.setResult(testPosts);

        expect(component.posts$).toBeObservable(createSingleCold(testPosts));
    })

    it('should show error component when errorMessage$ is not empty', () => {
        postsFetchingErrorMessageSelector.setResult('testError');
        fixture.detectChanges();

        expect(queryByDirective(fixture, ErrorComponent)).not.toBeNull()
    })

    it('should show progress bar component when isLoading$ is true', () => {
        isPostsLoadingSelector.setResult(true);
        fixture.detectChanges();

        expect(queryByDirective(fixture, MatProgressBar)).not.toBeNull()
    })
});