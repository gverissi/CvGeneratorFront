import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Project} from "../../entities/project/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly cvsUrl: string;
  private projectSubject = new BehaviorSubject<Project[]>([]);
  public findAllByCvIdAsObservable = this.projectSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cvsUrl = environment.apiUrl + 'cvs/';
  }

  public notifyCvProjectListChanged(cvId: number): void {
    this.findAllByCvId(cvId).subscribe(projects => this.projectSubject.next(projects));
  }

  public findAllByCvId(cvId: number): Observable<Project[]> {
    const url = this.cvsUrl + cvId + '/projects';
    return this.http.get<Project[]>(url);
  }

  public save(cvId: number, project: Project): Observable<Project> {
    const url = this.cvsUrl + cvId + '/projects';
    return this.http.post<Project>(url, project);
  }

  public update(cvId: number, project: Project) {
    const url = this.cvsUrl + cvId + '/projects/' + project.id;
    return this.http.put<Project>(url, project);
  }

  remove(cvId: number, projectId: number): Observable<void> {
    const url = this.cvsUrl + cvId + '/projects/' + projectId;
    return this.http.delete<void>(url);
  }

}
