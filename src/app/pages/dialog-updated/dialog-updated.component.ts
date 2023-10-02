import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListService } from 'src/app/core/services/list.service';
import { List } from 'src/app/shared/components/models/list.model';

@Component({
  selector: 'app-dialog-updated',
  templateUrl: './dialog-updated.component.html',
  styleUrls: ['./dialog-updated.component.scss']
})
export class DialogUpdatedComponent implements OnInit {
  id                 : any;
  idInput            : number | any;
  descriptionInput   : string = '';
  valueInput         : number | any;
  formattedValueInput: string = '';

  constructor(
    private listService: ListService,
    private dialogRefUpdated: MatDialogRef<DialogUpdatedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.descriptionInput = data.description;
    this.valueInput = data.value;
    this.formattedValueInput = this.formatCurrency(this.valueInput);
  }

  ngOnInit(): void {
  }

  updatedList(id: number) {
    const list: List = {
      description: this.descriptionInput,
      value: this.valueInput,
      updated_at: new Date(),
    };

    this.listService.updatedList(id, list)
      .subscribe(() => {
        setTimeout(() => {
          this.dialogRefUpdated.close('updated');
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
