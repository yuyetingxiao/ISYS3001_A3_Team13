import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from './app.component';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all inventory items
   * @returns Observable<Inventory[]> Inventory List
   */
  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve inventory items by name
   * @param name Item name
   * @returns Observable<Inventory> Single inventory item
   */
  getItemByName(name: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseUrl}/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Add a new inventory item
   * @param item Inventory item data
   * @returns Observable<any> Response result
   */
  addItem(item: Inventory): Observable<any> {
    return this.http.post(this.baseUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update inventory items
   * @param name Item name
   * @param item Updated inventory data
   * @returns Observable<any> Response result
   */
  updateItem(name: string, item: Inventory): Observable<any> {
    return this.http.put(`${this.baseUrl}/${name}`, item).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete an inventory item
   * @param name Item name
   * @returns Observable<any> Response result
   */
  deleteItem(name: string): Observable<any> {
    if (name.toLowerCase() === 'laptop') {
      return throwError(() => new Error('Laptop cannot be deleted'));
    }
    return this.http.delete(`${this.baseUrl}/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Unified error handling
   * @param error HTTP error response
   * @returns Observable<never> Error message
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
