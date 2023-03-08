import { ExpenseCategori } from './../../../../core/models/ExpenseCategori';
import { Component, OnInit } from '@angular/core';
import { ColumnsTable } from 'src/app/core/models/Table';
import { ExpenseCategoriService } from 'src/app/core/services/expense-categori.service';
import { Router } from '@angular/router';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss']
})
export class ExpenseCategoriesComponent implements OnInit {

  public dataSource!: ExpenseCategori[];
  public displayedColumns: ColumnsTable[] = [
    {tableColumn: 'nameCategori', columnName: 'Nome'},
    {tableColumn: 'descriptionCategori', columnName: 'Decrição'},
    {tableColumn: 'filed', columnName: 'Arquivado na lista', mask: 'boolean'},
  ];

  constructor(
    private serviceExpenseCategori: ExpenseCategoriService,
    public router: Router,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadExpenseCategories();
  }

  deleteExpenseCategori(id: number): void{
    this.swalUtils.showConfirm('Deseja excluir a categoria de despesa')
      .then(value => {
        if(value.isConfirmed){
          this.serviceExpenseCategori.deleteExpenseCategori(id).subscribe(() => {
            this.swalUtils.showSucessDelete('Empresa');
            this.loadExpenseCategories();
          });
        }
      });
  }

  private loadExpenseCategories(): void{
    this.serviceExpenseCategori.getAllExpenseCategories().subscribe(response => {
      if(response){
        this.dataSource = [...response];
      }
    })
  }
}
