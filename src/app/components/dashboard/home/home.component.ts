import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';
import { forkJoin } from 'rxjs';
import { GraphicService } from './../../../core/services/graphic.service';
import { Component, OnInit, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';
import { DialogExpenseComponent } from '../expense/expense/dialog.expense.component';
import { DialogInvoiceComponent } from '../invoice/invoice/dialog.invoice.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  doughnutChartData!: ChartConfiguration<'doughnut'>['data'];
  barChartDataInvoice!: ChartConfiguration<'bar'>['data'];
  barChartDataExpense!: ChartConfiguration<'bar'>['data'];
  barChartDataExpenseCategori!: ChartConfiguration<'bar'>['data'];
  barChartDataSimpleSwing!: ChartConfiguration<'bar'>['data']
  yearCurrent = new Date().getFullYear();

  @ViewChild("yearCurrent") yearCurrentInput!: NgModel;

  constructor(
    private dialog: MatDialog,
    private graphicService: GraphicService,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadChart();
  }

  ngAfterViewInit(): void {
    if(this.yearCurrentInput){
      this.yearCurrentInput.control.valueChanges
      .subscribe(value => {
        if(value){
          this.loadChart();
        }
      })
    }
  }

  openDialogInvoice(): void{
    this.dialog.open(DialogInvoiceComponent,{
      data: true
    });
  }

  openDialogExpense(): void{
    this.dialog.open(DialogExpenseComponent,{
      data: true
    });
  }

  loadChart(): void {
    this.swalUtils.showLoading('Carregando gráficos');
    forkJoin({
      billingAvailable: this.graphicService.getGraphicBillingAvailable(this.yearCurrent),
      invoiceMonth: this.graphicService.getGraphicInvoiceMonths(this.yearCurrent),
      expenseMonths: this.graphicService.getGraphicExpenseMonths(this.yearCurrent),
      expensePerCategori: this.graphicService.getGraphicExpensePerCategori(this.yearCurrent),
      simpleSwing: this.graphicService.getGraphicSimpleSwing(this.yearCurrent),
    }).subscribe(response => {
      this.doughnutChartData = {
        labels: [ 'Valor Limite', 'Valor Faturado', 'Valor Disponível' ],
        datasets: [
          { data: [ response.billingAvailable.billingLimit, 0, 0] },
          { data: [ 0, response.billingAvailable.totalPosted, response.billingAvailable.billingLimit - response.billingAvailable.totalPosted] },
        ]
      };

      const newDatasetsInvoicesMonths: any = [];
      response.invoiceMonth.forEach(value => {
        newDatasetsInvoicesMonths.push({
          data: [value.valueMonth],
          label: value.month
        });
      });
      this.barChartDataInvoice = {
        labels: [ 'Meses' ],
        datasets: newDatasetsInvoicesMonths
      };

      const newDatasetsExpensesMonths: any = [];
      response.expenseMonths.forEach(value => {
        newDatasetsExpensesMonths.push({
          data: [value.valueMonth],
          label: value.month
        });
      });
      this.barChartDataExpense = {
        labels: [ 'Meses' ],
        datasets: newDatasetsExpensesMonths
      };


      const newDatasetsExpensePerCategori: any = [];
      response.expensePerCategori.forEach(value => {
        newDatasetsExpensePerCategori.push({
          data: [value.valueTotalCategori],
          label: value.nameCategori
        });
      });
      this.barChartDataExpenseCategori = {
        labels: [ 'Categorias' ],
        datasets: newDatasetsExpensePerCategori
      };

      const newDatasetsSimplesSwing: any = [];
      response.simpleSwing.forEach(value => {
        newDatasetsSimplesSwing.push({
          data: [value.valueMonth],
          label: value.month
        });
      });
      this.barChartDataSimpleSwing = {
        labels: [ 'Meses' ],
        datasets: newDatasetsSimplesSwing
      };

      this.swalUtils.showSucess('Gráficos carregados!')
    });
  }

}
