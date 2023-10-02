import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BalanceService } from 'src/app/core/services/balance.service';

@Component({
  selector: 'app-dialog-delete-balance',
  templateUrl: './dialog-delete-balance.component.html',
  styleUrls: ['./dialog-delete-balance.component.scss']
})
export class DialogDeleteBalanceComponent implements OnInit {
  id: any;

  constructor(
    private balanceService: BalanceService,
    private dialogRefDeleteBalance: MatDialogRef<DialogDeleteBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  deleteBalance(id: number) {
    if (!id) return;
    this.balanceService.deleteBalance(id)
    .subscribe(() => {
      setTimeout(() => {
        this.dialogRefDeleteBalance.close('deletedBalance');
      }, 3000);
      window.location.reload();
    },
    (error) => {
      throw error;
    });
  }
}
