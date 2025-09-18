import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { AboutmeComponent } from "./components/aboutme/aboutme.component";
import { EducationComponent } from "./components/education/education.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ContactComponent } from "./components/contact/contact.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HomeComponent, AboutmeComponent, EducationComponent, ProjectsComponent, SkillsComponent, FooterComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
