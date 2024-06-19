import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseApiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPredmeti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/predmeti`);
  }

  getPredmet(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/predmeti/${id}`);
  }

  createPredmet(predmet: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/predmeti`, predmet);
  }

  updatePredmet(id: number, predmet: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/predmeti/${id}`, predmet);
  }

  deletePredmet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/predmeti/${id}`);
  }

  getProfesori(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/profesori`);
  }

  getProfesor(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/profesori/${id}`);
  }

  createProfesor(profesor: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/profesori`, profesor);
  }

  updateProfesor(id: number, profesor: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/profesori/${id}`, profesor);
  }

  deleteProfesor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/profesori/${id}`);
  }
}
