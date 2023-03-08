import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnsTable } from 'src/app/core/models/Table';

@Component({
  selector: 'app-table-paginated',
  templateUrl: './table-paginated.component.html',
  styleUrls: ['./table-paginated.component.scss']
})
export class TablePaginatedComponent implements OnInit, AfterViewInit  {

  public dataTable!: any[];
  @Input('dataTable')
  set _dataTable(value: any[]){
    if(this.dataSource){
      this.dataSource.data = [...value];
    } else {
      this.dataTable = value;
    }
  };
  @Input('tableColumns') displayedColumns: ColumnsTable[] = [];
  @Input('actionsColumnCheck') habilitActions!: boolean;
  @Input('actionsColumn') actionsColumnData!: Array<'delete' | 'update' | 'view' | 'print'>;
  @Input('actionsTableValidation') actionsTableValidation!: {
    icons: Array<'delete' | 'update' | 'view' | 'print'>,
    tableColumn: string,
  }
  @Input('filterValue')
  set _filter(value: string){
    this.filterValue = value;
    if(value){
      this.dataSource.filter = value.trim().toLowerCase();
    } else if(this.dataSource){
      this.dataSource.filter = value;
    }
  }

  @Output('delete') public deleteLine = new EventEmitter<any>();
  @Output('update') public updateLine = new EventEmitter<any>();
  @Output('view') public viewLine = new EventEmitter<any>();
  @Output('print') public printLine = new EventEmitter<any>();

  public dataSource!: MatTableDataSource<any>;
  public columnsHeader!: string[];
  public filterValue!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataTable);
    this.checkActionsColumn(this.habilitActions);
    this.addColumnsHeader();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public validationIcons(action: string): boolean{
    return this.actionsTableValidation && this.actionsTableValidation.icons.some(icon => icon === action)
  }

  private addColumnsHeader(): void{
    this.columnsHeader = [];
    this.displayedColumns.forEach(value => {
      this.columnsHeader.push(value.tableColumn);
    })
  }

  private checkActionsColumn(check: boolean): void{
    if(check){
      this.displayedColumns.push({tableColumn:'actions', columnName:'Ações'})
    }
  }
}
