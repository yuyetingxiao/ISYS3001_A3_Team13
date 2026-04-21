import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from './app.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseUrl);
  }

  getItemByName(name: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseUrl}/${name}`);
  }

  addItem(item: Inventory): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  updateItem(name: string, item: Inventory): Observable<any> {
    return this.http.put(`${this.baseUrl}/${name}`, item);
  }

  deleteItem(name: string): Observable<any> {
    if (name.toLowerCase() === 'laptop') {
      throw new Error('Laptop cannot be deleted');
    }
    return this.http.delete(`${this.baseUrl}/${name}`);
  }
}
