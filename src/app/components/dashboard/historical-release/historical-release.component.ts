import { Component } from '@angular/core';
import { Invoice } from 'src/app/core/models/Invoice';
import { ColumnsTable } from 'src/app/core/models/Table';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';

@Component({
  selector: 'app-historical-release',
  templateUrl: './historical-release.component.html',
  styleUrls: ['./historical-release.component.scss']
})
export class HistoricalReleaseComponent {

  checkPageLoad: boolean = true;
  yearCurrent = new Date().getFullYear();

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
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadHistoricRelease(this.yearCurrent);
  }

  loadHistoricRelease(year: number): void{
    this.serviceInvoice.getHistoricRelease(year).subscribe(response => {
      if(response){
        this.dataSource = [...response];
        setTimeout(() => {
          this.checkPageLoad = false;
        }, 800);
      }
    })
  }

}
