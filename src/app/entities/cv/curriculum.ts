import {Person} from "../person/person";
import {Information} from "../info/information";

export class Curriculum {

  id: number;
  name: string;
  person: Person;
  information: Information;

  constructor() {
    this.id = 0;
    this.name = "name";
    this.person = new Person();
    this.information = new Information();
  }

}
