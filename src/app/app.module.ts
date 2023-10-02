import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { ListComponent } from './pages/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/components/modules/angular-material.module';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from './pages/balance/balance.component';
import { ExtractComponent } from './pages/extract/extract.component';
import { DialogDeleteComponent } from './pages/dialog-delete/dialog-delete.component';
import { DialogUpdatedComponent } from './pages/dialog-updated/dialog-updated.component';
import { DialogDeleteBalanceComponent } from './pages/dialog-delete-balance/dialog-delete-balance.component';
import { DialogUpdatedBalanceComponent } from './pages/dialog-updated-balance/dialog-updated-balance.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ExtractComponent,
    DialogDeleteComponent,
    DialogUpdatedComponent,
    BalanceComponent,
    DialogDeleteBalanceComponent,
    DialogUpdatedBalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
