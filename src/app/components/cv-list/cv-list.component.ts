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
  cvId: number;

  constructor(private cvService: CurriculumService, private cvIdService: CvIdService) {
    this.cvList = [];
    this.cvId = 0;
  }

  ngOnInit(): void {
    this.cvListSubscription = this.cvService.findAllAsObservable.subscribe(cvList => {
      this.cvList = cvList;
      if (this.cvId ===0 && cvList.length > 0) {
        this.cvId = cvList[0].id;
      }
    });
  }

  ngOnDestroy(): void {
    this.cvListSubscription?.unsubscribe();
  }

  createNewCV(): void {
    const cv = new Curriculum();
    cv.name = 'new CV';
    this.cvService.save(cv).subscribe((cv) => {
      this.cvService.notifyCvListChanged();
      this.cvIdChanged(cv.id);
    });
  }

  cvIdChanged(cvId: number): void {
    this.cvId = cvId;
    this.cvIdService.notifyCvIdChanged(cvId);
  }

}
