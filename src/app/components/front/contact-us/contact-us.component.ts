
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfing } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MessageValidateFormPipe } from 'src/app/pipes/message-validate-form.pipe';
import { isPlatformBrowser } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  url = AppConfing.ENDPOINT+'send-message';
  form: FormGroup;
  dataLoading = false;
  sendLoading = false;
  constructor(private http:HttpClient,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private MsgVFormPipe:MessageValidateFormPipe,
    private deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformid: any,
    private titleService: Title) { }

  ngOnInit(): void {
    this.createForm();
    this.titleService.setTitle('Contáctanos');
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      message: ['',[Validators.required, Validators.minLength(5)]],
      button:[{value: '', disabled: true}]
    })

    this.dataLoading = false;
  }

  sendMessage(){
    this.sendLoading = true;
    if (this.form.status == 'INVALID') {
      this.form.markAllAsTouched();
      this.sendLoading = false;
    }
    console.log(this.form.value);

    this.http.post(this.url,this.form.value).subscribe( (resp:any) => {
      console.log(resp.result);

      if(resp.result == 'success'){
        this.toastr.success(resp.message);
        this.form.reset()
      }else{
        this.toastr.warning('Hubo un error al enviar el mensaje, verifique su conexión a internet e intente nuevamente');
      }


      this.sendLoading = false;
    },err=>{
      console.log(err);
      this.sendLoading = false;
    });

  }

  validate(name: string) {
    let campo: any = this.form.get(name);
    if (campo) {
      if (campo.touched && campo.status == 'INVALID') {
        let err = this.MsgVFormPipe.transform(campo.errors);
        return { 'valid': true, 'error': err };
      }
    }
    return { 'valid': false, 'error': '' };
  }


  goWhatsapp(number = 593989558833){

    if (isPlatformBrowser(this.platformid)) {

    if(this.deviceService.isMobile() || this.deviceService.isTablet()){
      window.open('https://api.whatsapp.com/send?phone='+number+'&text=Saludos, estoy interesado/a en sus servicios de sapiencia web');
    }else{
       window.open('https://web.whatsapp.com/send?phone='+number+'&text=Saludos, estoy interesado/a en sus servicios de sapiencia web');
    }
    }
  }

}
