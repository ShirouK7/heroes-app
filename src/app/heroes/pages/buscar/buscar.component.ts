import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(opcion: MatAutocompleteSelectedEvent) {

    if (!opcion.option.value) {
      console.log('No hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = opcion.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe)

  }

}
