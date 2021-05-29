import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "../../entities/person/person";
import {PersonService} from "../../services/person/person.service";
import {Subscription} from "rxjs";
import {CvIdService} from "../../services/cv-id/cv-id.service";
import {ImageService} from "../../services/image/image.service";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnDestroy {

  personSubscription: Subscription | undefined;
  person: Person;
  imageName: string;
  cvId: number = 0;

  constructor(private personService: PersonService, private imageService: ImageService, private cvIdService: CvIdService) {
    this.person = new Person();
    this.imageName = '';
  }

  ngOnInit(): void {
    this.personSubscription = this.cvIdService.cvIdObservable.subscribe(cvId => {
      this.cvId = cvId;
      if (cvId !== 0) {
        this.personService.findByCvId(cvId).subscribe(person => this.person = person);
        this.imageService.findByCvId(cvId).subscribe(imageName => {
          console.log('imageName = ', imageName);
          this.imageName = imageName;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.personSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.personService.save(this.cvId, this.person).subscribe(person => this.person = person);
  }

  onFileChanged(event: Event): void {
    console.log('onFileChanged');
    const target = <HTMLInputElement>event.target;
    if (target) {
      const files = target.files;
      if (files) {
        const file = files[0];
        if (file) {
          const imageForm = new FormData();
          imageForm.append('imageForm', file, file.name);
          this.imageName = file.name;
          this.imageService.saveImage(this.cvId, imageForm).subscribe(() => console.log('file saved'));
        }
      }
    }

    // const target = <HTMLInputElement>event.target;
    // const file: File = target.files[0];
    // const file: File = (<HTMLInputElement>event.target).files[0];
    // const target = event.target;
    // (<HTMLInputElement>event.target).files[0]
    // if (target !== null) {
    //   const file: File = target.files[0];
    //   const uploadData = new FormData();
    //   uploadData.append('myFile', file, file.name);
    //   this.imageService.saveImage(this.cvId, uploadData).subscribe(() => console.log('file saved'));
    // }
    // @ts-ignore
  }
}
