import {Component, OnInit} from '@angular/core';
import {Curriculum} from "../../entities/cv/curriculum";
import {CurriculumService} from "../../services/cv/curriculum.service";
import {CvIdService} from "../../services/cv-id/cv-id.service";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit {

  cvList: Curriculum[];

  constructor(private cvService: CurriculumService, private cvIdService: CvIdService) {
    this.cvList = [];
  }

  ngOnInit(): void {
    this.cvService.findAll().subscribe(cvList => {
      this.cvList = cvList;
    });
  }

  createNewCV(): void {
    const cv = new Curriculum();
    cv.name = 'new CV';
    this.cvService.save(cv);
  }

  cvIdChanged(cvId: number): void {
    this.cvIdService.notifyCvIdChanged(cvId);
  }

}
