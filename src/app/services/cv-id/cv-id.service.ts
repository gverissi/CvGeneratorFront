import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CvIdService {

  cvId: number = 0;
  cvIdSubject = new Subject<number>();
  cvIdObservable = this.cvIdSubject.asObservable();

  notifyCvIdChanged(cvId: number) {
    this.cvId = cvId;
    this.cvIdSubject.next(cvId);
  }

}
