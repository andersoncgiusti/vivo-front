import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BalanceService } from 'src/app/core/services/balance.service';
import { DialogUpdatedComponent } from '../dialog-updated/dialog-updated.component';
import { Balance } from 'src/app/shared/components/models/balance.Model';

@Component({
  selector: 'app-dialog-updated-balance',
  templateUrl: './dialog-updated-balance.component.html',
  styleUrls: ['./dialog-updated-balance.component.scss']
})
export class DialogUpdatedBalanceComponent implements OnInit {
  id                 : any;
  idInput            : number | any;
  descriptionInput   : string = '';
  valueInput         : number | any;
  formattedValueInput: string = '';

  constructor(
    private balanceService: BalanceService,
    private dialogRefUpdatedBalance: MatDialogRef<DialogUpdatedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.valueInput = data.value;
    this.formattedValueInput = this.formatCurrency(this.valueInput);
  }

  ngOnInit(): void {
  }

  updatedList(id: number) {
    const balance: Balance = {
      value: this.valueInput,
      updated_at: new Date(),
    };

    this.balanceService.updatedBalance(id, balance)
      .subscribe(() => {
        setTimeout(() => {
          this.dialogRefUpdatedBalance.close('updated');
        }, 3000);
        window.location.reload();
      });
  }

  formatCurrency(value: number | any): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  onValueFocus(): void {
    this.formattedValueInput = this.valueInput;
  }

  onValueBlur(): void {
    this.formattedValueInput = this.formatCurrency(this.valueInput);
  }

}
