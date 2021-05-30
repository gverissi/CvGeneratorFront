import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Experience} from "../../entities/experience/experience";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private readonly cvsUrl: string;
  private experienceSubject = new BehaviorSubject<Experience[]>([]);
  public findAllByCvIdAsObservable = this.experienceSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cvsUrl = environment.apiUrl + 'cvs/';
  }

  public notifyCvExperienceListChanged(cvId: number): void {
    this.findAllByCvId(cvId).subscribe(experiences => this.experienceSubject.next(experiences));
  }

  public findAllByCvId(cvId: number): Observable<Experience[]> {
    const url = this.cvsUrl + cvId + '/experiences';
    return this.http.get<Experience[]>(url);
  }

  public save(cvId: number, experience: Experience): Observable<Experience> {
    const url = this.cvsUrl + cvId + '/experiences';
    return this.http.post<Experience>(url, experience);
  }

  public update(cvId: number, experience: Experience) {
    const url = this.cvsUrl + cvId + '/experiences/' + experience.id;
    return this.http.put<Experience>(url, experience);
  }

  remove(cvId: number, experienceId: number): Observable<void> {
    const url = this.cvsUrl + cvId + '/experiences/' + experienceId;
    return this.http.delete<void>(url);
  }

}
