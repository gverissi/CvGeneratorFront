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
import { ExperienceFormComponent } from './components/experience-form/experience-form.component';
import { ExperienceListComponent } from './components/experience-list/experience-list.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { SkillComponent } from './components/skill/skill.component';
import { InformationFormComponent } from './components/information-form/information-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { FormationFormComponent } from './components/formation-form/formation-form.component';
import { FormationListComponent } from './components/formation-list/formation-list.component';

const appRoutes: Routes = [
  {path: 'cv', component: CvFormComponent},
  {path: 'person', component: PersonFormComponent},
  {path: 'information', component: InformationFormComponent},
  {path: 'skills', component: SkillListComponent},
  {path: 'experiences', component: ExperienceListComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: 'formations', component: FormationListComponent},
  {path: '', redirectTo: '/cv', pathMatch: 'full'},
  {path: '**', redirectTo: '/cv', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CvFormComponent,
    CvListComponent,
    NavbarComponent,
    PersonFormComponent,
    ExperienceFormComponent,
    ExperienceListComponent,
    SkillListComponent,
    SkillComponent,
    InformationFormComponent,
    ProjectListComponent,
    ProjectFormComponent,
    FormationFormComponent,
    FormationListComponent
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
