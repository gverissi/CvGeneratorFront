import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CvIdService {

  private cvIdSubject = new BehaviorSubject<number>(0);
  public cvIdObservable = this.cvIdSubject.asObservable();

  public notifyCvIdChanged(cvId: number): void {
    this.cvIdSubject.next(cvId);
  }

}
