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
    { icon: 'material.png', name: 'Material Design' },
    { icon: 'api.png', name: 'Rest-Api' },     
    { icon: 'scrum.png', name: 'Scrum' }
  ];

  projectList = [
    {
      id: 0,
      img: './assets/img//join.png',
      title: 'Join',
      languages: 'Angular | TypeScript | HTML | CSS | Firebase',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      projecturl: 'https://okan-kaplan.developerakademie.net/join/index.html',
      githuburl: 'https://github.com/maksmuehlbauer/Join_Gruppenarbeit'
    },
    { 
      id: 1,
      img: './assets/img/my-projects/elpolloloco.png',
      title: 'Pollo Loco',
      languages: 'JavaScript | HTML | CSS',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      projecturl: 'https://okan-kaplan.developerakademie.net/el-pollo-loco/index.html',
      githuburl: 'https://github.com/okankpl/EL-POLLO-LOCO'
    },
    
    {
      id: 3,
      img: './assets/img/my-projects/pokedex.png',
      title: 'Pokédex',
      languages: 'JavaScript | HTML | CSS | Api ',
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      projecturl: 'https://okan-kaplan.developerakademie.net/Pokedex/index.html',
      githuburl: 'https://github.com/okankpl/Pokedex'
    },
   
  ]
}