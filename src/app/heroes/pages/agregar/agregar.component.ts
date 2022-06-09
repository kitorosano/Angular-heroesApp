import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        widht: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC-Comics' },
    { id: 'Marvel Comics', desc: 'Marvel-Comics' },
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;

    this.heroe.id
      ? this.heroeService.updateHeroe(this.heroe).subscribe((heroe) => {
          this.mostrarSnackbar('Registro actualizado');
        })
      : this.heroeService.createHeroe(this.heroe).subscribe((heroe) => {
          this.mostrarSnackbar('Registro');
          this.router.navigate(['/heroes/editar', heroe.id]);
        });
  }

  borrar() {
    this.dialog
      .open(ConfirmarComponent, {
        width: '250px',
        data: this.heroe,
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.heroeService.deleteHeroe(this.heroe.id!).subscribe(() => {
            this.mostrarSnackbar('Registro eliminado');
            this.router.navigate(['/heroes']);
          });
        }
      });
  }

  mostrarSnackbar(message: string) {
    this.snackbBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
