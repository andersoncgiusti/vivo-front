import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListService } from 'src/app/core/services/list.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {
  id: any;

  constructor(
    private listService: ListService,
    private dialogRefDelete: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  deleteList(id: number) {
    if (!id) return;
    this.listService.deleteList(id)
    .subscribe(() => {
      setTimeout(() => {
        this.dialogRefDelete.close('deleted');
      }, 3000);
      window.location.reload();
    },
    (error) => {
      throw error;
    });
  }
}
