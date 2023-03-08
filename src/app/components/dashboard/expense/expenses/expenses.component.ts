import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/core/models/Expense';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { Router } from '@angular/router';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';
import { ColumnsTable } from 'src/app/core/models/Table';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  public dataSource!: Expense[];
  public displayedColumns: ColumnsTable[] = [
    {tableColumn: 'expenseName', columnName: 'Nome'},
    {tableColumn: 'expenseAmount', columnName: 'Valor', mask: 'money'},
    {tableColumn: 'payDay', columnName: 'Data de pagamento', mask: 'date'},
    {tableColumn: 'accrualDate', columnName: 'Data de competência', mask: 'date'},
    {tableColumn: 'expenseCategori', complement: 'nameCategori', columnName: 'Categoria'},
  ];

  constructor(
    private serviceExpense: ExpenseService,
    public router: Router,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadExpense();
  }

  deleteExpense(id: number): void{
    this.swalUtils.showConfirm('Deseja excluir a despesa?')
      .then(value => {
        if(value.isConfirmed){
          this.serviceExpense.deleteExpense(id).subscribe(() => {
            this.swalUtils.showSucessDelete('Empresa');
            this.loadExpense();
          });
        }
      });
  }

  private loadExpense(): void{
    this.serviceExpense.getAllExpenses().subscribe(response => {
      if(response){
        this.dataSource = [...response];
      }
    })
  }
}
