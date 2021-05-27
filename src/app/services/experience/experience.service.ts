import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Experience} from "../../entities/experience/experience";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private readonly experienceUrl: string;

  constructor(private http: HttpClient) {
    this.experienceUrl = environment.apiUrl + 'cvs/';
  }

  public findByCvId(cvId: number): Observable<Experience[]> {
    const url = this.experienceUrl + cvId + '/experiences';
    return this.http.get<Experience[]>(url);
  }

  public save(cvId: number, experience: Experience): Observable<Experience> {
    const url = this.experienceUrl + cvId + '/experiences';
    return this.http.post<Experience>(url, experience);
  }

  public update(cvId: number, experience: Experience) {
    const url = this.experienceUrl + cvId + '/experiences/' + experience.id;
    return this.http.put<Experience>(url, experience);
  }

}
