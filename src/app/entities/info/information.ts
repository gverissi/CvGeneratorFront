export class Information {

  id: number;
  birthDate: Date;
  mobility: string;
  phone: string;
  email: string;
  linkedIn: string;
  gitHub: string;

  constructor() {
    this.id = 0;
    this.birthDate = new Date();
    this.mobility = "";
    this.phone = "";
    this.email = "";
    this.linkedIn = "";
    this.gitHub = "";
  }

}
