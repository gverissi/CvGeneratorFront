import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {Project} from "../../entities/project/project";
import {ProjectService} from "../../services/project/project.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projectListSubscription: Subscription | undefined;
  projects: Project[];
  cvId: number = 0;

  constructor(private projectService: ProjectService, private cvIdService: CvIdService) {
    this.projects = [];
  }

  ngOnInit(): void {
    this.projectListSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      this.cvId = cvId;
      if (cvId !== 0) {
        this.projectService.notifyCvProjectListChanged(cvId);
      }
    });
    this.projectService.findAllByCvIdAsObservable.subscribe(projects => this.projects = projects);
  }

  ngOnDestroy(): void {
    this.projectListSubscription?.unsubscribe();
  }

  newProject(): void {
    this.projects.push(new Project());
  }

  onSubmit(): void {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === 0) {
        this.projectService.save(this.cvId, this.projects[i]).subscribe(exp => this.projects[i] = exp);
      } else {
        this.projectService.update(this.cvId, this.projects[i]).subscribe();
      }
    }
  }

}
