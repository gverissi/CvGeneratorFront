import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "../../entities/person/person";
import {PersonService} from "../../services/person/person.service";
import {Subscription} from "rxjs";
import {CvIdService} from "../../services/cv-id/cv-id.service";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnDestroy {

  personSubscription: Subscription | undefined;
  person: Person;

  constructor(private personService: PersonService, private cvIdService: CvIdService) {
    this.person = new Person();
  }

  ngOnInit(): void {
    this.personSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      if (cvId !== 0) {
        this.personService.findByCvId(cvId).subscribe(person => this.person = person);
      }
    });
  }

  ngOnDestroy(): void {
    this.personSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.personService.save(this.person).subscribe(result => console.log(result));
  }

}
