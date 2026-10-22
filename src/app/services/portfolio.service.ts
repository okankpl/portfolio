import { Injectable } from '@angular/core';

export interface PortfolioProject {
  id: string;
  img: string;
  imageAlt?: string;
  width: number;
  height: number;
  title: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  featured?: boolean;
  projecturl?: string;
  githuburl: string;
  demoNote?: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  readonly skills = [
    { icon: 'ang.png', name: 'Angular' },
    { icon: 'ts.png', name: 'TypeScript' },
    { icon: 'js.png', name: 'JavaScript' },
    { icon: 'html.png', name: 'HTML' },
    { icon: 'css.png', name: 'CSS' },
    { icon: 'firebase.png', name: 'Firebase' },
    { icon: 'git.png', name: 'Git' },
    { icon: 'material.png', name: 'Material' },
    { icon: 'api.png', name: 'REST APIs' },
    { icon: 'scrum.png', name: 'Scrum' }
  ];

  readonly backendSkills = ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Redis', 'Docker'];

  readonly testingSkills = ['Vitest', 'Jasmine', 'Pytest', 'Playwright', 'GitHub Actions'];

  readonly projects: PortfolioProject[] = [
    {
      id: 'smartdesk',
      img: './assets/img/smartdesk-support.webp',
      imageAlt: 'PROJECTS.SMARTDESK.IMAGE_ALT',
      width: 1600,
      height: 1000,
      title: 'PROJECTS.SMARTDESK.TITLE',
      description: 'PROJECTS.SMARTDESK.DESCRIPTION',
      technologies: ['Angular', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
      highlights: ['PROJECTS.SMARTDESK.WORKFLOW', 'PROJECTS.SMARTDESK.ROLES', 'PROJECTS.SMARTDESK.HISTORY'],
      featured: true,
      projecturl: 'https://smartdesk-okan.duckdns.org',
      githuburl: 'https://github.com/okankpl/SmartDesk',
      demoNote: 'PROJECTS.SMARTDESK.DEMO_NOTE'
    },
    {
      id: 'join',
      img: './assets/img/join.png',
      width: 1622,
      height: 1140,
      title: 'PROJECTS.JOIN.TITLE',
      description: 'PROJECTS.JOIN.DESCRIPTION',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      projecturl: 'https://join.okan-kaplan.de/',
      githuburl: 'https://github.com/maksmuehlbauer/Join_Gruppenarbeit'
    },
    {
      id: 'pollo-loco',
      img: './assets/img/elpolloloco.png',
      width: 670,
      height: 425,
      title: 'PROJECTS.POLLO_LOCO.TITLE',
      description: 'PROJECTS.POLLO_LOCO.DESCRIPTION',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      projecturl: 'https://elpolloloco.okan-kaplan.de/',
      githuburl: 'https://github.com/okankpl/EL-POLLO-LOCO'
    }
  ];
}
