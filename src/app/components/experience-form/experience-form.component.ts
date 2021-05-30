import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../entities/experience/experience";
import {ExperienceService} from "../../services/experience/experience.service";

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnInit {

  @Input() experience!: Experience;
  @Input() cvId!: number;

  constructor(private experienceService: ExperienceService) {
  }

  ngOnInit(): void {
  }

  remove(): void {
    this.experienceService.remove(this.cvId, this.experience.id).subscribe(() => this.experienceService.notifyCvExperienceListChanged(this.cvId));
  }

}
