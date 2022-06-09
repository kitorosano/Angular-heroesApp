import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    console.log('pipe procesado');

    // if heroe.alt_img exists then return heroe.alt_img else if heroe.id exists then return correspondind image, if not return 'assets/img/no-image.png'
    return heroe.alt_img ? heroe.alt_img : 'assets/no-image.png';
  }
}
