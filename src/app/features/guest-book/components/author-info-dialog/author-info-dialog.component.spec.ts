import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorInfoDialogComponent } from './author-info-dialog.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as Selectors from '../../store/guest-book.selectors';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { createSingleCold } from '../../../../core/test-utils.spec';
import { testaAuthor } from '../../guest-book.test-data.spec';

describe('AuthorInfoDialogComponent', () => {
    let component: AuthorInfoDialogComponent;
    let fixture: ComponentFixture<AuthorInfoDialogComponent>;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthorInfoDialogComponent],
            providers: [
                provideMockStore({})
            ],
            imports: [
                MatDialogModule,
                MatInputModule
            ]
        })
            .compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(AuthorInfoDialogComponent);
        component = fixture.componentInstance;

        const selector = store.overrideSelector(Selectors.selectedMessageAuthorSelector, null);
        selector.setResult(testaAuthor);
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should set author$', () => {
        expect(component.author$).toBeObservable(createSingleCold(testaAuthor));
    })
});
