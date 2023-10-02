import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { ExtractComponent } from './pages/extract/extract.component';
import { DialogDeleteComponent } from './pages/dialog-delete/dialog-delete.component';
import { BalanceComponent } from './pages/balance/balance.component';

const routes: Routes = [
  { path: '', component : ListComponent },
  { path: 'list', component : ListComponent },
  { path: 'balance', component : BalanceComponent },
  { path: 'extract', component : ExtractComponent },
  { path: 'dialogDelete/:id', component: DialogDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
