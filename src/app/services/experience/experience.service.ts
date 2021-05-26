import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Experience} from "../../entities/experience/experience";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) {
  }

  public findByCvId(cvId: number): Observable<Experience[]> {
    const experienceUrl = environment.apiUrl + 'cvs/' + cvId + '/experiences';
    return this.http.get<Experience[]>(experienceUrl);
  }

  public save(cvId: number, experience: Experience) {
    const experienceUrl = environment.apiUrl + 'cvs/' + cvId + '/experiences';
    return this.http.post<Experience>(experienceUrl, experience);
  }

}
