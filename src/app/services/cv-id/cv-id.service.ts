import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CvIdService {

  cvIdSubject = new BehaviorSubject<number>(0);
  cvIdObservable = this.cvIdSubject.asObservable();

  notifyCvIdChanged(cvId: number) {
    this.cvIdSubject.next(cvId);
  }

}
