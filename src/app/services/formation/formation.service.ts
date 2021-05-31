import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Formation} from "../../entities/formation/formation";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private readonly cvsUrl: string;
  private formationSubject = new BehaviorSubject<Formation[]>([]);
  public findAllByCvIdAsObservable = this.formationSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cvsUrl = environment.apiUrl + 'cvs/';
  }

  public notifyCvFormationListChanged(cvId: number): void {
    this.findAllByCvId(cvId).subscribe(projects => this.formationSubject.next(projects));
  }

  public findAllByCvId(cvId: number): Observable<Formation[]> {
    const url = this.cvsUrl + cvId + '/formations';
    return this.http.get<Formation[]>(url);
  }

  public save(cvId: number, formation: Formation): Observable<Formation> {
    const url = this.cvsUrl + cvId + '/formations';
    return this.http.post<Formation>(url, formation);
  }

  public update(cvId: number, formation: Formation) {
    const url = this.cvsUrl + cvId + '/formations/' + formation.id;
    return this.http.put<Formation>(url, formation);
  }

  remove(cvId: number, formationId: number): Observable<void> {
    const url = this.cvsUrl + cvId + '/formations/' + formationId;
    return this.http.delete<void>(url);
  }

}
