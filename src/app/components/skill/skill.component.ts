import {Component, Input, OnInit} from '@angular/core';
import {Skill} from "../../entities/skill/skill";
import {SkillService} from "../../services/skill/skill.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() skill!: Skill;
  @Input() cvId!: number;

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
  }

  remove(): void {
    this.skillService.remove(this.cvId, this.skill.id).subscribe(() => this.skillService.notifyCvSkillListChanged(this.cvId));
  }

}
