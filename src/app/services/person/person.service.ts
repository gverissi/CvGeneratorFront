import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Person} from "../../entities/person/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personUrl: string;

  constructor(private http: HttpClient) {
    this.personUrl = environment.apiUrl + 'cvs/1/person';
  }

  public findByCvId(cvId: number): Observable<Person> {
    return this.http.get<Person>(this.personUrl);
  }

  public save(person: Person) {
    return this.http.post<Person>(this.personUrl, person);
  }

}
