import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'src/app/shared/components/models/list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  createList(list: List): Observable<List> {
    return this.http.post<List>(`${environment.apiUrl}/api/list`, list);
  }

  getList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/list`);
  }

  getListById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/list/${id}`);
  }

  updatedList(id: number, list: List): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/list/${id}`, list);
  }

  deleteList(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/list/${id}`);
  }
}
