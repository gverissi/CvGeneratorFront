import {Component, Input, OnInit} from '@angular/core';
import {Formation} from "../../entities/formation/formation";
import {FormationService} from "../../services/formation/formation.service";

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.css']
})
export class FormationFormComponent implements OnInit {

  @Input() formation!: Formation;
  @Input() cvId!: number;

  constructor(private formationService: FormationService) {
  }

  ngOnInit(): void {
  }

  remove(): void {
    this.formationService.remove(this.cvId, this.formation.id).subscribe(() => this.formationService.notifyCvFormationListChanged(this.cvId));
  }

}
