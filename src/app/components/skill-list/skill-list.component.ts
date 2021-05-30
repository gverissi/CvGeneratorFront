import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ExperienceService} from "../../services/experience/experience.service";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {Skill} from "../../entities/skill/skill";
import {SkillService} from "../../services/skill/skill.service";

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit, OnDestroy {

  allSkills: Skill[];
  skillTypes: string[] | undefined;

  cvSkillListSubscription: Subscription | undefined;
  cvSkills: Skill[];
  cvId: number = 0;
  skillId: number;

  constructor(private experienceService: ExperienceService, private cvIdService: CvIdService, private skillService: SkillService) {
    this.skillId = 0;
    this.cvSkills = [];
    this.allSkills = [];
  }

  ngOnInit(): void {
    this.skillService.findAll().subscribe(allSkills => {
      this.allSkills = allSkills;
      this.skillTypes = [...new Set(allSkills.map(skill => skill.type))];
    });
    // this.cvSkillListSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
    //   this.cvId = cvId;
    //   if (cvId !== 0) {
    //     this.skillService.findAllByCvId(cvId).subscribe(skills => this.cvSkills = skills);
    //   }
    // });
    this.cvSkillListSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      this.cvId = cvId;
      if (cvId !== 0) {
        this.skillService.notifyCvSkillListChanged(cvId);
      }
    });
    this.skillService.findAllByCvIdAsObservable.subscribe(skills => this.cvSkills = skills);
  }

  ngOnDestroy(): void {
    this.cvSkillListSubscription?.unsubscribe();
  }

  addSkill(): void {
    this.cvSkills.push(this.allSkills.filter(skill => skill.id == this.skillId)[0]);
  }

  onSubmit(): void {
    if (this.skillId != 0) {
      this.skillService.save(this.cvId, this.skillId).subscribe(() => this.addSkill());
    }
  }

}
