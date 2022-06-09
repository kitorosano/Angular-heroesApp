import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [],
})
export class ConfirmarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public heroe: Heroe) {}
}
