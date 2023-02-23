import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})

export class AgregarComponent implements OnInit{

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: ''
  }

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog:MatDialog
  ) {}

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.heroeService.getHeroeById(id) )
        )
        .subscribe( (heroe) => this.heroe = heroe)
    }

    return;

  }

  guardar() {
    // console.log(this.heroe);
  
    if ( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if (this.heroe.id) {
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe( heroe => {
          console.log('Actualizando', heroe)
          this.mostrarSnackBar('Registro Actualizado');
        }
    )}
    else {
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          // console.log('Respuesta', resp);
          this.router.navigate( ['/heroes/editar', heroe.id] )
          this.mostrarSnackBar('Registro Actualizado');
        })
    }

  }

  eliminar() {
    
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: {...this.heroe}
    })

    dialog.afterClosed()
      .subscribe(
        (result) => {
          if(result) {
            this.heroeService.eliminarHeroe(this.heroe.id!)
              .subscribe(resp => {
                this.router.navigate(['/heroes']);
              });
          }
        }
      )
    
  }

  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }

}
