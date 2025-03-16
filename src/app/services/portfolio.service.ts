import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor() { }

  skills = [
    { icon: 'ang.png', name: 'Angular' },
    { icon: 'ts.png', name: 'TypeScript' },
    { icon: 'js.png', name: 'JavaScript' },
    { icon: 'html.png', name: 'HTML' },
    { icon: 'css.png', name: 'Firebase' },
    { icon: 'firebase.png', name: 'GIT' },
    { icon: 'git.png', name: 'CSS' },
    { icon: 'material.png', name: 'Material' },
    { icon: 'api.png', name: 'Rest-Api' },
    { icon: 'scrum.png', name: 'Scrum' }
  ];

  projects = [
    {
      id: 0,
      img: './assets/img/join.png',
      title: 'PROJECTS.JOIN.TITLE',
      description: 'PROJECTS.JOIN.DESCRIPTION',
      languages: 'JavaScript | HTML | CSS',
      projecturl: 'https://join.okan-kaplan.de/',
      githuburl: 'https://github.com/maksmuehlbauer/Join_Gruppenarbeit'
    },
    {
      id: 1,
      img: './assets/img/elpolloloco.png',
      title: 'PROJECTS.POLLO_LOCO.TITLE',
      description: 'PROJECTS.POLLO_LOCO.DESCRIPTION',
      languages: 'JavaScript | HTML | CSS',
      projecturl: 'https://elpolloloco.okan-kaplan.de/',
      githuburl: 'https://github.com/okankpl/EL-POLLO-LOCO'
    },

    {
      id: 1,
      img: './assets/img/pokedex.png',
      title: 'PROJECTS.POKEDEX.TITLE',
      description: 'PROJECTS.POKEDEX.DESCRIPTION',
      languages: 'JavaScript | HTML | CSS',
      projecturl: 'https://pokedex.okan-kaplan.de/',
      githuburl: 'https://github.com/okankpl/pokedex'
    },



  ];
}
