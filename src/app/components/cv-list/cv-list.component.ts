import { Component, OnInit } from '@angular/core';
import {Curriculum} from "../../entities/cv/curriculum";
import {CurriculumService} from "../../services/cv/curriculum.service";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit {

  cvList: Curriculum[];

  constructor(private cvService: CurriculumService) {
    this.cvList = [];
  }

  ngOnInit(): void {
    this.cvService.findAll().subscribe(data => {
      this.cvList = data;
    });
  }

}
