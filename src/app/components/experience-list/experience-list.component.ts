import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Experience} from "../../entities/experience/experience";
import {ExperienceService} from "../../services/experience/experience.service";
import {CvIdService} from "../../services/cv-id/cv-id.service";

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit, OnDestroy {

  experienceListSubscription: Subscription | undefined;
  experiences: Experience[];
  cvId: number = 0;

  constructor(private experienceService: ExperienceService, private cvIdService: CvIdService) {
    this.experiences = [];
  }

  ngOnInit(): void {
    this.experienceListSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      this.cvId = cvId;
      if (cvId !== 0) {
        this.experienceService.findByCvId(cvId).subscribe(experiences => this.experiences = experiences);
      }
    });
  }

  ngOnDestroy(): void {
    this.experienceListSubscription?.unsubscribe();
  }

  newExperience(): void {
    this.experiences.push(new Experience());
  }

  onSubmit(): void {
    this.experiences.forEach(experience => this.experienceService.save(this.cvId, experience).subscribe(value => console.log(value)))
    // this.experienceService.save(this.cvId, this.experiences[0]).subscribe(value => console.log(value));
  }

}
