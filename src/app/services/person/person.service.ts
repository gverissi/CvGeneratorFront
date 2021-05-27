import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Person} from "../../entities/person/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly personUrl: string;

  constructor(private http: HttpClient) {
    this.personUrl = environment.apiUrl + 'cvs/';
  }

  public findByCvId(cvId: number): Observable<Person> {
    const url = this.personUrl + cvId + '/person';
    return this.http.get<Person>(url);
  }

  public save(cvId: number, person: Person): Observable<Person> {
    const url = this.personUrl + cvId + '/person';
    return this.http.post<Person>(url, person);
  }

}
