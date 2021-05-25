import { Component, OnInit } from '@angular/core';
import {Curriculum} from "../../entities/cv/curriculum";
import {CurriculumService} from "../../services/cv/curriculum.service";

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit {

  cv: Curriculum;

  constructor(private cvService: CurriculumService) {
    this.cv = new Curriculum();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.cvService.save(this.cv).subscribe(result => console.log(result));
  }

}
