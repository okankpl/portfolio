import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  skillList = [
    { icon: 'ang.png', name: 'Angular' },
    { icon: 'typescript.png', name: 'TypeScript' },
    { icon: 'js.png', name: 'JavaScript' },
    { icon: 'html.png', name: 'HTML' },
    { icon: 'fire.png', name: 'Firebase' },
    { icon: 'git.png', name: 'GIT' },
    { icon: 'css.png', name: 'CSS' },
    { icon: 'auto.png', name: 'Material Design' },
    { icon: 'api.png', name: 'Rest-Api' },     
    { icon: 'scrum.png', name: 'Scrum' }
  ];

  projectList = [
    {
      id: 0,
      img: './assets/img/my-projects/join.png',
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