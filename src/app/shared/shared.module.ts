import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ErrorComponent } from './components/error/error.component';
import { RatingComponent } from './components/rating/rating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/orderBy.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        OrderByPipe,
        ErrorComponent,
        RatingComponent
    ],
    exports: [
        FilterPipe,
        OrderByPipe,
        ErrorComponent,
        RatingComponent
    ],
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatButton,
        MatTooltip,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule
    ],
    providers: []
})
export class SharedModule { }
