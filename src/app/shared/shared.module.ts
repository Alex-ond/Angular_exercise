import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FilterPipe } from './pipes/filter-by/filter-by.pipe';
import { ErrorComponent } from './components/error/error.component';
import { RatingComponent } from './components/rating/rating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';

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
        MatIconModule,
        CommonModule
    ],
    providers: []
})
export class SharedModule { }
