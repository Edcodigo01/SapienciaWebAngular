import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import works from 'src/app/data-json/works.json';

@Component({
  selector: 'app-last-works',
  templateUrl: './last-works.component.html',
  styleUrls: ['./last-works.component.css'],
})
export class LastWorksComponent implements OnInit {
  @Input() worksOf: string;
  works: any;
  selected: any;
  @ViewChild('modalWork') modalWork: any;
  constructor(
    private modalS: NgbModal,
    @Inject(PLATFORM_ID) private platformid: any
  ) {}

  ngOnInit(): void {
    if (this.worksOf == 'Edwar') this.works = works.works_edwar;
    else this.works = works.works;
  }

  location() {
    if (isPlatformBrowser(this.platformid)) {
      return window.location.href;
    } else {
      return '';
    }
  }

  openModal(name: string) {
    let select = this.works.filter((x: any) => x.name === name);
    this.selected = select[0];
    this.modalS.open(this.modalWork, { ariaLabelledBy: 'modal-basic-title' });
  }

  orderInverse(array: any) {
    array = array
      .map((item: any, index: any) => {
        return { value: item, index };
      })
      .sort((a: any, b: any) => b.index - a.index)
      .map((item: any) => {
        return item.value;
      });
    // console.log(array);
    if (array.includes('nodejs.png')) {
    }
    return array;
  }
}
