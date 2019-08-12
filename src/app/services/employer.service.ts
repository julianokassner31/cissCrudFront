import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer } from '../model/Employer';

@Injectable({providedIn: 'root'})
export class EmployerService {

  private URI = 'employers';

  constructor(private httpClient: HttpClient) { }

  public getEmployers(): Observable<any> {
    return this.httpClient.get<any>(`${environment.API}/${this.URI}`);
  }

  public getEmployersPageable(page: number, rows: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.API}/${this.URI}/employers-pageable?page=${page}&rows=${rows}`);
  }

  public findEmployers(query: string): Observable<Employer[]> {
    return this.httpClient.get<Employer[]>(`${environment.API}/${this.URI}/find?query=${query}`);
  }

  public emailAlreadyRegistered(query: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.API}/${this.URI}/email-already-registered?query=${query}`);
  }

  public getEmployer(id: string): Observable<Employer> {
    return this.httpClient.get<Employer>(`${environment.API}/${this.URI}/${id}`);
  }

  public create(employer: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API}/${this.URI}`, employer);
  }

  public update(employer: any): Observable<Employer> {
    return this.httpClient.put<Employer>(`${environment.API}/${this.URI}`, employer);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.API}/${this.URI}/${id}`);
  }
}
