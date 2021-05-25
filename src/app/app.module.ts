import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CvListComponent } from './components/cv-list/cv-list.component';
import {AngularSplitModule} from "angular-split";
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { PersonFormComponent } from './components/person-form/person-form.component';

const appRoutes: Routes = [
  {path: 'cv', component: CvFormComponent},
  {path: 'person', component: PersonFormComponent},
  {path: '', redirectTo: '/cv', pathMatch: 'full'},
  {path: '**', redirectTo: '/cv', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CvFormComponent,
    CvListComponent,
    NavbarComponent,
    PersonFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularSplitModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
