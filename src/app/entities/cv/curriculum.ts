import {Person} from "../person/person";

export class Curriculum {

  id: number;
  name: string;
  person: Person;

  constructor() {
    this.id = 0;
    this.name = "name";
    this.person = new Person();
  }

}
