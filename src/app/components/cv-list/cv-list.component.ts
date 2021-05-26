import {Component, OnDestroy, OnInit} from '@angular/core';
import {Curriculum} from "../../entities/cv/curriculum";
import {CurriculumService} from "../../services/cv/curriculum.service";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit, OnDestroy {

  cvList: Curriculum[];
  cvListSubscription: Subscription | undefined;

  constructor(private cvService: CurriculumService, private cvIdService: CvIdService) {
    this.cvList = [];
  }

  ngOnInit(): void {
    // this.cvService.findAll().subscribe(cvList => {
    //   this.cvList = cvList;
    // });
    this.cvListSubscription = this.cvService.findAllAsObservable.subscribe(cvList => {
      this.cvList = cvList;
    });
  }

  ngOnDestroy(): void {
    this.cvListSubscription?.unsubscribe();
  }

  createNewCV(): void {
    const cv = new Curriculum();
    cv.name = 'new CV';
    this.cvService.save(cv).subscribe(() => this.cvService.notifyCvListChanged());
  }

  cvIdChanged(cvId: number): void {
    this.cvIdService.notifyCvIdChanged(cvId);
  }

}
