import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListService } from 'src/app/core/services/list.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogUpdatedComponent } from '../dialog-updated/dialog-updated.component';
import { Data } from '@angular/router';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {
  displayedColumns: string[] = [
    'data',
    'descricao',
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

  dialogRefDelete: MatDialogRef<DialogDeleteComponent> | undefined;
  dialogRefUpdated: MatDialogRef<DialogUpdatedComponent> | undefined;

  constructor(
    private listService: ListService,
    public dialog: MatDialog,
    ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.listService.getList()
    .subscribe((data: any) => {
      this.dataSource.data = data.Results.map((result: any) => ({
        id: result.id,
        data: result.created_at,
        descricao: result.description,
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
        this.getList();
      }, 30000);
    });
  }

  openDialogDelete(id: number): void {
    this.dialogRefDelete = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { id },
    });

    this.dialogRefDelete.afterClosed().subscribe(result => {
      if (result === 'deleted') return;
    });
  }

  openDialogUpdated(id: number, description: string, value: number): void {
    this.dialogRefUpdated = this.dialog.open(DialogUpdatedComponent, {
      width: '250px',
      data: { id, description, value },
    });

    this.dialogRefUpdated.afterClosed().subscribe(result => {
      if (result === 'updated') return;
    });
  }
}


