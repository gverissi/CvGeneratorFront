import { Component } from '@angular/core';
import {CvIdService} from "./services/cv-id/cv-id.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FrontBeetween';
  cvId: number = 0;

  constructor(private cvIdService: CvIdService) {
    this.cvIdService.cvIdObservable.subscribe(cvId => this.cvId = cvId);
  }

}
