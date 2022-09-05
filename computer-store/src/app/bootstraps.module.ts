import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@NgModule({
    imports: [
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTableModule,
        MdbCarouselModule
    ],
    exports: [
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTableModule,
        MdbCarouselModule,
    ]
})
export class BootstrapsModule { }