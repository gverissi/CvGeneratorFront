import {Component, OnDestroy, OnInit} from '@angular/core';
import {Curriculum} from "../../entities/cv/curriculum";
import {CurriculumService} from "../../services/cv/curriculum.service";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit, OnDestroy {

  cvSubscription: Subscription | undefined;
  cv: Curriculum;

  constructor(private cvService: CurriculumService, private cvIdService: CvIdService) {
    this.cv = new Curriculum();
  }

  ngOnInit(): void {
    this.cvSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      if (cvId !== 0) {
        this.cvService.findById(cvId).subscribe(cv => this.cv = cv);
      }
    });
  }

  ngOnDestroy(): void {
    this.cvSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.cvService.update(this.cv).subscribe(() => this.cvService.notifyCvListChanged());
  }

  showHtml(): void {
    const url = "http://localhost:8080/cvs/" + this.cv.id + "/show-html";
    window.open(url, "_blank");
  }

  // downloadPdf() {
  //   const url = "http://localhost:8080/cvs/" + this.cv.id + "/show-html";
  //   window.open(url, "_blank");
  // }

}
