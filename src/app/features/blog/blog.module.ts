import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './store/blog.effects';
import { blogReducer } from './store/blog.reducer';
import { FeatureNames } from '../../core/feature-names';
import { SharedModule } from '../../shared/shared.module';
import { InjectNames } from '../../core/inject-names';
import { environment } from '../../core/environments/environment';
import { BlogComponent } from './components/blog/blog.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostComponent } from './components/post/post.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';

@NgModule({
  declarations: [
    BlogComponent, 
    PostCommentsComponent,
    PostComponent,
    PostCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forFeature(FeatureNames.Blog, blogReducer),
    EffectsModule.forFeature([BlogEffects]),
    SharedModule,
    MatCardModule,
    MatProgressBarModule,
    MatButton,
    MatTooltip,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
],
  providers: [
    {
      provide: InjectNames.BlogBaseApiUrl, useValue: environment.blogBaseApiUrl
    },
    {
      provide: InjectNames.PostRatingApiUrl, useValue: environment.postRatingApiUrl
    }
  ]
})
export class BlogModule {}
