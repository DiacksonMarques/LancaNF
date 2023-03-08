import { SwalUtils } from './../../../../shared/utils/swal/swal-utils';
import { Router } from '@angular/router';
import { Company } from './../../../../core/models/Company';
import { CompanysService } from './../../../../core/services/companys.service';
import { Component, OnInit } from '@angular/core';
import { ColumnsTable } from 'src/app/core/models/Table';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.scss']
})
export class CompanysComponent implements OnInit{

  public dataSource!: Company[];
  public displayedColumns: ColumnsTable[] = [
    {tableColumn: 'cnpj', columnName: 'CNPJ', mask: 'identifier'},
    {tableColumn: 'companyName', columnName: 'Nome'},
    {tableColumn: 'corporateName', columnName: 'Razão Social'},
  ];

  constructor(
    private serviceCompany: CompanysService,
    public router: Router,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadCompanys();
  }

  deleteCompany(id: number): void{
    this.swalUtils.showConfirm('Deseja excluir a empresa')
      .then(value => {
        if(value.isConfirmed){
          this.serviceCompany.deleteCompany(id).subscribe(() => {
            this.swalUtils.showSucessDelete('Empresa');
            this.loadCompanys();
          });
        }
      });
  }

  private loadCompanys(): void{
    this.serviceCompany.getAllCompanys().subscribe(response => {
      if(response){
        this.dataSource = [...response];
      }
    })
  }
}
