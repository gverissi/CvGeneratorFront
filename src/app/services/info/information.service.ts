import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Information} from "../../entities/info/information";

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private readonly cvsUrl: string;

  constructor(private http: HttpClient) {
    this.cvsUrl = environment.apiUrl + 'cvs/';
  }

  public findByCvId(cvId: number): Observable<Information> {
    const url = this.cvsUrl + cvId + '/information';
    return this.http.get<Information>(url);
  }

  public save(cvId: number, information: Information): Observable<Information> {
    const url = this.cvsUrl + cvId + '/information';
    return this.http.post<Information>(url, information);
  }

}
