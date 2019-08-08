import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer } from '../model/Employer';

@Injectable({providedIn: 'root'})
export class EmployerService {

  constructor(private httpClient: HttpClient) { }

  public getEmployers(): Observable<Employer[]> {
    return this.httpClient.get<Employer[]>(`${environment.API}/employer`);
  }

  public findEmployers(query: string): Observable<Employer[]> {
    return this.httpClient.get<Employer[]>(`${environment.API}/employer/find?query=${query}`);
  }

  public getEmployer(id: string): Observable<Employer> {
    return this.httpClient.get<Employer>(`${environment.API}/employer/${id}`);
  }

  public create(employer: any): Observable<Employer> {
    return this.httpClient.post<Employer>(`${environment.API}/employer`, employer);
  }

  public update(employer: any): Observable<Employer> {
    return this.httpClient.put<Employer>(`${environment.API}/employer`, employer);
  }

  public delete(id: string) {
    return this.httpClient.delete(`${environment.API}/employer/${id}`);
  }
}
