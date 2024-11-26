import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { MatCardModule } from '@angular/material/card';
import { getInnerText, queryByCss } from '../../../core/test-utils.spec';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [MatCardModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
  });

  it('should show subtitle with errorMessage', () => {
    component.errorMessage = 'testSubTitle';
    fixture.detectChanges();
    
    const element = queryByCss(fixture, 'mat-card-subtitle');
    expect(getInnerText(element)).toBe('testSubTitle');
  });

  it('should show content with errorDetails', () => {
    component.errorDetails = 'testContent'
    fixture.detectChanges();

    const element = queryByCss(fixture, 'mat-card-content');
    expect(getInnerText(element)).toBe('testContent');
  });
});
