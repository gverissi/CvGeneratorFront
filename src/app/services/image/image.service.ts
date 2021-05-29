import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly cvsUrl: string;

  constructor(private http: HttpClient) {
    this.cvsUrl = environment.apiUrl + 'cvs/';
  }

  findByCvId(cvId: number): Observable<any> {
    const url = this.cvsUrl + cvId + '/image';
    // return this.http.get<string>(url);
    // @ts-ignore
    return this.http.get<any>(url, {responseType: 'text'});
  }

  public saveImage(cvId: number, file: FormData): Observable<void> {
    const url = this.cvsUrl + cvId + '/image';
    return this.http.post<void>(url, file);
  }

}
