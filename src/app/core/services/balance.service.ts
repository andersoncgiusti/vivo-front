import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Balance } from 'src/app/shared/components/models/balance.Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  createBalance(balance: Balance): Observable<Balance> {
    return this.http.post<Balance>(`${environment.apiUrl}/api/balance`, balance);
  }

  getBalance(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/balance`);
  }

  updatedBalance(id: number, balance: Balance): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/balance/${id}`, balance);
  }

  deleteBalance(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/balance/${id}`);
  }
}
