import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostPhone} from '../models/postPhone.model';
import { PhoneService } from '../services/phoneService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html'
})

export class FormsComponent {

  model = new PostPhone('', '', '', '',  '', '', '');
  hasCodeLangError: Boolean = false;
  disbableSubmit: Boolean = false;

  constructor( private phoneService: PhoneService,
                private _route: Router) { }

  firstToUpper(value: string): void  {
    if (value.length > 0) {
      this.model.battery = '';
      this.model.name = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.name = value;
    }
  }

  ramWithGB(event): void  {
    const ram_value = this.model.ram;
    if (ram_value.length > 0) {
      this.model.ram = ' ';
      this.model.ram = ram_value.trim() + 'GB';
    } else {
      this.model.ram = ram_value;
    }
  }

  batteryWithmah(event): void  {
    const battery_value = this.model.battery;
    if (battery_value.length > 0) {
      this.model.battery = '';
      this.model.battery = battery_value.trim() + 'mAH';
    } else {
      this.model.battery = battery_value;
    }
  }

  submitForm(form: NgForm): void {
    // console.log(form.value);
    this.phoneService.postEmployee(form.value)
        .subscribe(data => console.log('success', data));

    this._route.navigate(['/phone']);
  }

}
