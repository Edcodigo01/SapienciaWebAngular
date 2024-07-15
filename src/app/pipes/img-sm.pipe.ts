import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgSm'
})
export class ImgSmPipe implements PipeTransform {

  transform(value: string): string {
    if(value.includes('.jpg')){
      return value.replace('.jpg','-sm.jpg')
    }else if(value.includes('.png')){
      return value.replace('.png','-sm.jpg')
    }else{
      return value;
    }

  }

}
