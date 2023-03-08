import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TablePaginatedComponent } from './table-paginated/table-paginated.component';

import { getPortuguesePaginatorIntl } from 'src/assets/config/getPortuguesePaginatorIntl';

import { PipesModule } from '../../../core/pipes/pipes.module';

@NgModule({
  declarations: [
    TablePaginatedComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    PipesModule
  ],
  exports: [
    TablePaginatedComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ]
})
export class TableModule {}
