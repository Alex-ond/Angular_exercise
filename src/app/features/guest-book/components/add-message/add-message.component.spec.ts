import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMessageComponent } from './add-message.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { SharedModule } from '../../../../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { queryByCss } from '../../../../core/test-utils.spec';
import { Store } from '@ngrx/store';
import { addMessage } from '../../store/guest-book.actions';
import { testNewMessage } from '../../guest-book.test-data.spec';

describe('AddMessageComponent', () => {
    let component: AddMessageComponent;
    let fixture: ComponentFixture<AddMessageComponent>;
    let store: jasmine.SpyObj<Store>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddMessageComponent],
            providers: [
                { provide: Store, useValue: jasmine.createSpyObj<Store>(['dispatch', 'select']) }
            ],
            imports: [
                MatCardModule,
                MatFormField,
                SharedModule,
                MatInputModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ]
        })
            .compileComponents();

        store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        fixture = TestBed.createComponent(AddMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set form to invalid when name is empty', () => {
        component.form.setValue(
            {
                name: '',
                email: '',
                message: '1'.repeat(20)
            }
        )
        expect(component.form.valid).toBeFalse();
    });

    it('should set form to invalid when email is not valid', () => {
        component.form.setValue(
            {
                name: 'name',
                email: 'test',
                message: '1'.repeat(20)
            }
        )
        expect(component.form.valid).toBeFalse();
    });

    it('should set form to invalid when message < 20 characters', () => {
        component.form.setValue(
            {
                name: 'name',
                email: 'test@test.com',
                message: '1'.repeat(19)
            }
        )
        expect(component.form.valid).toBeFalse();
    });

    it('should set form to valid', () => {
        component.form.setValue(
            {
                name: 'name',
                email: 'test@test.com',
                message: '1'.repeat(20)
            }
        )
        expect(component.form.valid).toBeTrue();
    });

    it('should call dispatch on button click', () => {
        component.form.setValue(
            {
                name: 'name',
                email: 'test@test.com',
                message: '1'.repeat(20)
            }
        )
        fixture.detectChanges();

        const button = queryByCss(fixture, '.addButton').nativeElement as HTMLButtonElement;
        button.click();

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            addMessage(testNewMessage)
        );
    });
});
