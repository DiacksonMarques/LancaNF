import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/core/models/Invoice';
import { ColumnsTable } from 'src/app/core/models/Table';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit{

  public dataSource!: Invoice[];
  public displayedColumns: ColumnsTable[] = [
    {tableColumn: 'numberInvoice', columnName: 'Número'},
    {tableColumn: 'valueInvoice', columnName: 'Valor', mask: 'money'},
    {tableColumn: 'monthInvoice', columnName: 'Mês de competência '},
    {tableColumn: 'receiptDate', columnName: 'Data de recebimento', mask: 'date'},
    {tableColumn: 'company', complement: 'companyName', columnName: 'Empresa'},
  ];

  constructor(
    private serviceInvoice: InvoiceService,
    public router: Router,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadInvoice();
  }

  deleteInvoice(id: number): void{
    this.swalUtils.showConfirm('Deseja excluir a nota fiscal?')
      .then(value => {
        if(value.isConfirmed){
          this.serviceInvoice.deleteInvoice(id).subscribe(() => {
            this.swalUtils.showSucessDelete('Nota Fiscal');
            this.loadInvoice();
          });
        }
      });
  }

  private loadInvoice(): void{
    this.serviceInvoice.getAllInvoices().subscribe(response => {
      if(response){
        this.dataSource = [...response];
      }
    })
  }

}
