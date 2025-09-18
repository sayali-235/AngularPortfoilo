import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  isScrolled: boolean = false;

  navItems: { label: string; path: string; }[] = [
    { label: 'Home', path: 'home' },
    { label: 'About Me', path: 'aboutme' },
    { label: 'Education', path: 'education' },
    { label: 'Projects', path: 'projects' },
    {label:'Experience',path:'experience'},
    { label: 'Skills', path: 'skills' },
    { label: 'Contact', path: 'contact' },
  ];

  activeSection: string = this.navItems[0].path;

  private observer: IntersectionObserver | null = null;
  private sectionElements: HTMLElement[] = [];

  // track navbar background on scroll 
  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
 
    const navbarHeight = 120; // fixed navbar height
    const scrollPos = window.scrollY + navbarHeight;
 
    for (const item of this.navItems) {
      const section = document.getElementById(item.path);
      if (section) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
 
        if (scrollPos >= top && scrollPos < bottom) {
          this.activeSection = item.path;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    // collect section elements (must exist in DOM and have matching ids)
    this.sectionElements = this.navItems
      .map(item => document.getElementById(item.path))
      .filter((el): el is HTMLElement => !!el);

    if (this.sectionElements.length === 0) {
      // nothing to observe — ids probably don't match; debug note in console
      console.warn('NavbarComponent: no sections found. Ensure section ids match navItems.path');
      return;
    }

    // IntersectionObserver options:
    // rootMargin pulls the "active zone" inward so a section becomes active
    // when it reaches around middle of the viewport (adjust -40% if you want earlier/later)
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    // map to store latest ratio per section
    const ratios = new Map<string, number>();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        ratios.set(id, entry.intersectionRatio);
      });

      // find section with highest intersectionRatio
      let bestId: string | null = null;
      let bestRatio = -1;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId && bestRatio > 0) {
        this.activeSection = bestId;
      } else {
        // fallback: pick section closest to top
        let closestId = this.activeSection;
        let minDistance = Number.POSITIVE_INFINITY;
        for (const el of this.sectionElements) {
          const d = Math.abs(el.getBoundingClientRect().top);
          if (d < minDistance) {
            minDistance = d;
            closestId = el.id;
          }
        }
        this.activeSection = closestId;
      }
    }, options);

    // observe each section
    this.sectionElements.forEach(el => this.observer!.observe(el));

    // ensure active state is set initially (in case user loads mid-page)
    setTimeout(() => {
      // trigger manual check if needed
      this.sectionElements.forEach(el => {
        // no-op: observer will provide ratios shortly
      });
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // smooth scroll with navbar offset and collapse mobile menu
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // subtract navbar height so section doesn't hide under fixed navbar
    const navEl = document.querySelector('.navbar') as HTMLElement | null;
    const navHeight = navEl ? navEl.offsetHeight : 0;
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 8; // small extra gap

    window.scrollTo({ top, behavior: 'smooth' });
    this.closeNavbar();
  }

  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  isActive(path: string): boolean {
    return this.activeSection === path;
  }
}
