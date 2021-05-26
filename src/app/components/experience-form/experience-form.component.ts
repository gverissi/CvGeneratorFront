import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../entities/experience/experience";

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnInit {

  @Input() experience!: Experience;

  constructor() {
  }

  ngOnInit(): void {
  }

}
