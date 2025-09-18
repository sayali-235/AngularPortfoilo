import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {path:'aboutme',component:AboutmeComponent},
    { path: 'education', component: EducationComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'footer', component: FooterComponent },
];
