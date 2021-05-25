import { Component, OnInit } from '@angular/core';
import {Person} from "../../entities/person/person";
import {PersonService} from "../../services/person/person.service";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person: Person;

  constructor(private personService: PersonService) {
    this.person = new Person();
  }

  ngOnInit(): void {
    this.personService.findByCvId(1).subscribe(person => this.person = person);
  }

  onSubmit(): void {
    this.personService.save(this.person).subscribe(result => console.log(result));
  }

}
