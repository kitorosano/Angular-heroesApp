import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(value: Heroe): string {
    // if value.alt_img exists then return value.alt_img else if value.id exists then return correspondind image, if not return 'assets/img/no-image.png'
    return value.alt_img
      ? value.alt_img
      : value.id
      ? `assets/heroes/${value.id}.jpg`
      : 'assets/no-image.png';
  }
}
