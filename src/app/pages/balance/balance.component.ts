import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { BalanceService } from 'src/app/core/services/balance.service';
import { DialogDeleteBalanceComponent } from '../dialog-delete-balance/dialog-delete-balance.component';
import { DialogUpdatedBalanceComponent } from '../dialog-updated-balance/dialog-updated-balance.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  displayedColumns: string[] = [
    'data',
    'valor',
    'atualizar',
    'excluir'
  ];

  dataSource: MatTableDataSource<Data>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id              : string = '';
  data            : string = '';
  descricao       : string = '';
  valor           : string = '';
  atualizar       : string = '';
  excluir         : string = '';
  not             : any;
  dataSourceTotal : any;
  total           : any;

  loading         : boolean = false;
  error           : boolean = false;

  results         : any[] = [];
  result          : any[] = [];

  dialogRefDeleteBalance: MatDialogRef<DialogDeleteBalanceComponent> | undefined;
  dialogRefUpdatedBalance: MatDialogRef<DialogUpdatedBalanceComponent> | undefined;

  constructor(
    private balanceService: BalanceService,
    public dialogBalance: MatDialog,
    ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getBalance();
  }

  getBalance() {
    this.balanceService.getBalance()
    .subscribe((data: any) => {
      this.dataSource.data = data.Results.map((result: any) => ({
        id: result.id,
        data: result.created_at,
        valor: result.value,
      }));
      this.not = data.Results.length;

      this.dataSourceTotal = data.Results.map((result: any) => ({
        valor: parseFloat(result.value),
      }));

      const total = this.dataSourceTotal.map((item: any) => item.valor);
      const sumaTotal = total.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
      this.total = sumaTotal.toFixed(2);
    },
    (error: any) => {
      setTimeout(() => {
        this.getBalance();
      }, 30000);
    });
  }



  openDialogDeleteBalance(id: number): void {
    this.dialogRefDeleteBalance = this.dialogBalance.open(DialogDeleteBalanceComponent, {
      width: '250px',
      data: { id },
    });

    this.dialogRefDeleteBalance.afterClosed().subscribe(result => {
      if (result === 'deletedBalance') return;
    });
  }


  openDialogUpdatedBalance(id: number, value: number): void {
    this.dialogRefUpdatedBalance = this.dialogBalance.open(DialogUpdatedBalanceComponent, {
      width: '250px',
      data: { id, value },
    });

    this.dialogRefUpdatedBalance.afterClosed().subscribe(result => {
      if (result === 'updatedBalance') return;
    });
  }
}
