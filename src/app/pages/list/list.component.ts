import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { BalanceService } from 'src/app/core/services/balance.service';
import { ListService } from 'src/app/core/services/list.service';
import { Balance } from 'src/app/shared/components/models/balance.Model';
import { List } from 'src/app/shared/components/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'data',
    'descricao',
    'valor'
  ];
  dataSource: MatTableDataSource<Data>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data               : string = '';
  description        : string = '';
  value              : string = '';
  loading            : boolean = false;
  error              : boolean = false;
  results            : any[] = [];
  result             : any[] = [];
  descriptionInput   : string = '';
  valueInput         : number | any;
  dataSourceTotal    : any;
  total              : any;
  not                : any;
  panelOpenState = false;

  constructor(
    private listService: ListService,
    private balanceService: BalanceService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getList();
    this.getBalance();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    const balance: Balance = {
      value: this.valueInput,
    };
    this.balanceService.createBalance(balance)
    .subscribe((response: any) => {
      this.getBalance();
      this.clear();
    });
  }

  createList() {
    this.step++;
    const list: List = {
      description: this.descriptionInput,
      value: this.valueInput,
    };
    this.listService.createList(list)
    .subscribe((response: any) => {
      this.getList();
      this.getBalance();
      this.clearAll();
    });
  }

  prevStep() {
    this.step--;
    this.clear();
    this.clearAll();
  }

  clear() {
    this.valueInput = '';
  }

  clearAll() {
    this.descriptionInput = ''
    this.valueInput = '';
  }

  disableValue() {
    return this.valueInput === '' || this.valueInput < 0;
  }

  disable() {
    return this.descriptionInput === '' && this.valueInput === '' || this.valueInput < 0;
  }

  getList() {
    this.listService.getList()
      .subscribe((response: any) => {
        const limitedResults = response.Results.slice(-4).reverse();
        this.dataSource.data = limitedResults.map((result: any) => ({
          data: result.created_at,
          descricao: result.description,
          valor: result.value,
        }));
        this.not = response.Results.length;
      },
      (error) => {
        setTimeout(() => {
          this.getList();
        }, 30000);
      });
  }

  getBalance() {
    this.balanceService.getBalance()
      .subscribe((response: any) => {
        this.dataSourceTotal = response.Results.map((result: any) => ({
          valor: parseFloat(result.value),
        }));
        const total = this.dataSourceTotal.map((item: any) => item.valor);
        const sumaTotal = total.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
        this.total = sumaTotal.toFixed(2);
      },
      (error) => {
        setTimeout(() => {
          this.getBalance();
        }, 30000);
      });
  }

  extrato() {
    this.router.navigate(['/extract'])
  }

  extratoBalance() {
    this.router.navigate(['/balance'])
  }
}
