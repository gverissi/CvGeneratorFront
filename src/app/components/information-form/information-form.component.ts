import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {Information} from "../../entities/info/information";
import {InformationService} from "../../services/info/information.service";

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.css']
})
export class InformationFormComponent implements OnInit, OnDestroy {

  informationSubscription: Subscription | undefined;
  information: Information;
  imageName: string;
  cvId: number = 0;

  constructor(private informationService: InformationService, private cvIdService: CvIdService) {
    this.information = new Information();
    this.imageName = '';
  }

  ngOnInit(): void {
    this.informationSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      this.cvId = cvId;
      if (cvId !== 0) {
        this.informationService.findByCvId(cvId).subscribe(information => this.information = information);
      }
    });
  }

  ngOnDestroy(): void {
    this.informationSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.informationService.save(this.cvId, this.information).subscribe(information => this.information = information);
  }

}
