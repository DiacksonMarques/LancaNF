import { ColumnsTable, FilterTable } from 'src/app/core/models/Table';
import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listing-data',
  templateUrl: './listing-data.component.html',
  styleUrls: ['./listing-data.component.scss']
})
export class ListingDataComponent implements OnInit {

  @Input() titlePage!: string;
  @Input() iconTitlePage!: string;
  @Input() descriptionPage!: string;

  @Input() titleListing!: string;
  @Input() titleFilter!: string;

  @Input() descriptionButton!: string;

  @Input() tableColumns!: ColumnsTable[];
  @Input() dataTable!: any[];
  @Input() actionsTable: Array<'delete' | 'update' | 'view' | 'print'> = ['delete', 'update', 'view', 'print'];
  @Input() actionsTableValidation!: {
    icons: Array<'delete' | 'update' | 'view' | 'print'>,
    tableColumn: string,
  }

  @Input() columnsFilter: FilterTable[] = [];
  @Output('valueFilter') columnsFilterChange = new EventEmitter<FilterTable[]>();


  @Output('delete') public deleteSelect = new EventEmitter<any>();
  @Output('update') public updateSelect = new EventEmitter<any>();
  @Output('save') public saveSelect = new EventEmitter<any>();
  @Output('view') public viewSelect = new EventEmitter<any>();
  @Output('print') public printSelect = new EventEmitter<any>();

  checkPageLoad: boolean = true;


  constructor( ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.checkPageLoad = false;
    }, 800);
  }
}
