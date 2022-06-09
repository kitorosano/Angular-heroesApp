import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80vh;
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe({
        next: (heroes) => (this.heroes = heroes),
      });
  }
}
