import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageValidateForm'
})
export class MessageValidateFormPipe implements PipeTransform {

  transform(error: any): string {

    if (error?.required) {
      return 'Este campo es requerido.';
    } else if (error?.boolean) {
      return 'Este campo debe ser verdadero o falso.';
    } else if (error?.file) {
      return 'Este campo debe ser un archivo.';
    } else if (error?.image) {
      return 'Este campo debe ser una imagen.';

    } else if (error?.maxlength) {
      return 'arreglar este';
    } else if (error?.minlength) {
      return 'Este campo debe tener al menos: ' + error?.minlength.requiredLength + ' caracteres.';
    } else if (error?.number) {
      return 'Este campo debe ser un número.';
    } else if (error?.email) {
      return 'La dirección de correo es inválida.';
    } else if (error?.urlyoutube) {
      return 'La dirección url de youtube es incorrecta.';
    } else {
      return 'Formato de texto inválido para este campo.';
    }
  }
}
