import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../entities/project/project";
import {ProjectService} from "../../services/project/project.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  @Input() project!: Project;
  @Input() cvId!: number;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  remove(): void {
    this.projectService.remove(this.cvId, this.project.id).subscribe(() => this.projectService.notifyCvProjectListChanged(this.cvId));
  }

}
