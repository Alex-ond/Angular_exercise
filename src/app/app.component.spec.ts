import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './features/blog/components/blog/blog.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, HeaderComponent],
            imports: [
                RouterModule.forRoot(
                    [
                      { path: 'blog', component: BlogComponent, title: 'Blog' }
                    ]
                  )
            ],
            
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'Blog' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Blog');
    });
});
