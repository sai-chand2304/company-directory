import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl ='assets/companies.json';
  constructor(private http:HttpClient) { }

  getCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(this.apiUrl);
  }
}
