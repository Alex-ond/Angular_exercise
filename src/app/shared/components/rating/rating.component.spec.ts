import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { getInnerText, queryAllByCss, queryByCss } from '../../../core/test-utils.spec';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingComponent],
      imports: [MatCardModule, MatIconModule],
      
    })
      .compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;

    component.starCount = 10;
    component.value = 4;
    component.size = 'small';
    fixture.detectChanges();
  });

  it('should have 10 icons', () => {
    expect(queryAllByCss(fixture, 'mat-icon')).toHaveSize(10);
  });

  it('should have 4 star icons and 6 star border icons', () => {
    const icons = queryAllByCss(fixture, 'mat-icon');
    for (let i = 0; i < 4; i++) {
      expect(getInnerText(icons[i])).toBe('star');
    }
    for (let i = 4; i < 9; i++) {
      expect(getInnerText(icons[i])).toBe('star_border');
    }
  });

  it('should change value to 2 on click', () => {
    const icons = queryAllByCss(fixture, 'mat-icon');
    (icons[1].nativeElement as HTMLElement).click();

    expect(component.value).toBe(2);
  });

  it('should not change value on click when readonly = true', () => {
    component.readonly = true;
    const icons = queryAllByCss(fixture, 'mat-icon');
    (icons[1].nativeElement as HTMLElement).click();

    expect(component.value).toBe(4);
  });

  it('should have mat-icon-small class', () => {
    const icon = queryByCss(fixture, 'mat-icon');
    
    expect(icon.nativeElement).toHaveClass('mat-icon-small');
  });
});
