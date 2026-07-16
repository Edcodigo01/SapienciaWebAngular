import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfing } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MessageValidateFormPipe } from 'src/app/pipes/message-validate-form.pipe';
import { isPlatformBrowser } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  url = AppConfing.ENDPOINT + 'send-message';
  form: FormGroup;
  dataLoading = false;
  sendLoading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly msgVFormPipe: MessageValidateFormPipe,
    private readonly deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private readonly platformid: any
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
      button: [{ value: '', disabled: true }]
    });

    this.dataLoading = false;
  }

  sendMessage(): void {
    this.sendLoading = true;
    if (this.form.status === 'INVALID') {
      this.form.markAllAsTouched();
      this.sendLoading = false;
    }
    console.log(this.form.value);

    this.http.post(this.url, this.form.value).subscribe((resp: any) => {
      console.log(resp.result);

      if (resp.result === 'success') {
        this.toastr.success(resp.message);
        this.form.reset();
      } else {
        this.toastr.warning('Hubo un error al enviar el mensaje, verifique su conexion a internet e intente nuevamente');
      }

      this.sendLoading = false;
    }, (err) => {
      console.log(err);
      this.sendLoading = false;
    });
  }

  validate(name: string): { valid: boolean; error: string } {
    const campo: any = this.form.get(name);
    if (campo && campo.touched && campo.status === 'INVALID') {
      const err = this.msgVFormPipe.transform(campo.errors);
      return { valid: true, error: err };
    }
    return { valid: false, error: '' };
  }

  goWhatsapp(number = 593989558833): void {
    if (isPlatformBrowser(this.platformid)) {
      if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
        window.open(`https://api.whatsapp.com/send?phone=${number}&text=Saludos, estoy interesado/a en sus servicios de sapiencia web`);
      } else {
        window.open(`https://web.whatsapp.com/send?phone=${number}&text=Saludos, estoy interesado/a en sus servicios de sapiencia web`);
      }
    }
  }
}
