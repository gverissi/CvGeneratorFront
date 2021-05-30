export class Project {

  id: number;
  title: string;
  year: number;
  description: string;
  site: string;
  gitHub: string;

  constructor() {
    this.id = 0;
    this.title = "Your project title";
    this.year = 2020;
    this.description = "Your project description";
    this.site = "Link to your web site";
    this.gitHub = "Link to your GitHub project";
  }

}
