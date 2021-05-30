import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Skill} from "../../entities/skill/skill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly cvsUrl: string;
  private skillSubject = new BehaviorSubject<Skill[]>([]);
  public findAllByCvIdAsObservable = this.skillSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cvsUrl = environment.apiUrl + 'cvs/';
  }

  public notifyCvSkillListChanged(cvId: number): void {
    this.findAllByCvId(cvId).subscribe(skills => this.skillSubject.next(skills));
  }

  public findAll(): Observable<Skill[]> {
    const url = this.cvsUrl + 'skills';
    return this.http.get<Skill[]>(url);
  }

  public save(cvId: number, skillId: number): Observable<void> {
    const url = this.cvsUrl + cvId + '/skills';
    return this.http.post<void>(url, skillId);
  }

  public findAllByCvId(cvId: number): Observable<Skill[]> {
    const url = this.cvsUrl + cvId + '/skills';
    return this.http.get<Skill[]>(url);
  }

  remove(cvId: number, skillId: number): Observable<void> {
    const url = this.cvsUrl + cvId + '/skills/' + skillId;
    return this.http.delete<void>(url);
  }

}
