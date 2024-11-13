import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ErrorComponent } from '../shared/error/error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [    
        FilterPipe,
        ErrorComponent
    ],
    exports: [
        FilterPipe,
        ErrorComponent
    ],
    imports: 
    [
        MatCardModule,
        MatProgressBarModule,
        MatButton,
        MatTooltip,
        MatFormFieldModule,
        MatInputModule,
        CommonModule
    ],
    providers: []
})
export class SharedModule {}
