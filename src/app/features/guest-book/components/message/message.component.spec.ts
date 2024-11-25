import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { queryByCss } from '../../../../core/test-utils.spec';
import { testMessage } from '../../guest-book.test-data.spec';

describe('MessageComponent', () => {
    let component: MessageComponent;
    let fixture: ComponentFixture<MessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                MessageComponent
            ],
            providers: [
                provideMockStore({})
            ],
            imports: [
                MatCardModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MessageComponent);
        component = fixture.componentInstance;
        component.message = testMessage;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show name', () => {
        const element = queryByCss(fixture, 'mat-card-title').nativeElement as HTMLElement;
        expect(element.innerText).toBe(testMessage.author.name);
    });

    it('should show message', () => {
        const element = queryByCss(fixture, 'mat-card-content').nativeElement as HTMLElement;
        expect(element.innerText).toBe(testMessage.message);
    });
});
