import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Curriculum} from "../../entities/cv/curriculum";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  cvUrl: string;

  constructor(private http: HttpClient) {
    this.cvUrl = environment.apiUrl + 'cvs';
  }

  public findAll(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.cvUrl);
  }

  public save(cv: Curriculum) {
    return this.http.post<Curriculum>(this.cvUrl, cv);
  }

}
