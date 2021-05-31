import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {FormationService} from "../../services/formation/formation.service";
import {Formation} from "../../entities/formation/formation";

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit, OnDestroy {

  formationSubscription: Subscription | undefined;
  formations: Formation[];
  cvId: number = 0;

  constructor(private formationService: FormationService, private cvIdService: CvIdService) {
    this.formations = [];
  }

  ngOnInit(): void {
    this.formationSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      this.cvId = cvId;
      if (cvId !== 0) {
        this.formationService.notifyCvFormationListChanged(cvId);
      }
    });
    this.formationService.findAllByCvIdAsObservable.subscribe(formations => this.formations = formations);
  }

  ngOnDestroy(): void {
    this.formationSubscription?.unsubscribe();
  }

  newProject(): void {
    this.formations.push(new Formation());
  }

  onSubmit(): void {
    for (let i = 0; i < this.formations.length; i++) {
      if (this.formations[i].id === 0) {
        this.formationService.save(this.cvId, this.formations[i]).subscribe(form => this.formations[i] = form);
      } else {
        this.formationService.update(this.cvId, this.formations[i]).subscribe();
      }
    }
  }

}
