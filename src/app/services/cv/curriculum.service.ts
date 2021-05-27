import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Curriculum} from "../../entities/cv/curriculum";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  private readonly cvUrl: string;
  private cvSubject = new BehaviorSubject<Curriculum[]>([]);
  public findAllAsObservable = this.cvSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cvUrl = environment.apiUrl + 'cvs';
    this.notifyCvListChanged();
  }

  public notifyCvListChanged(): void {
    this.findAll().subscribe(cvList => this.cvSubject.next(cvList));
  }

  public findAll(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.cvUrl);
  }

  public findById(cvId: number): Observable<Curriculum> {
    const url = this.cvUrl + '/' + cvId;
    return this.http.get<Curriculum>(url);
  }

  public save(cv: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(this.cvUrl, cv);
  }

  public update(cv: Curriculum): Observable<Curriculum> {
    const url = this.cvUrl + '/' + cv.id;
    return this.http.put<Curriculum>(url, cv);
  }

}
