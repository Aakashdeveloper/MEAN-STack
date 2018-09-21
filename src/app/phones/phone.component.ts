import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../services/phoneService.service';
import { IPhone } from '../models/phoneData.model';


@Component({
    selector: 'app-phone',
    templateUrl: './phone.component.html'
})

export class PhoneComponent implements OnInit {
    title: String = '*****Product List';
    showTable: Boolean = true;
    showImage: Boolean = false;
    serachPhone: string;
    imageWidth: Number = 50;
    phones: IPhone[];

    constructor(private _phoneSerivce: PhoneService) {}

    ngOnInit(): void {
        this._phoneSerivce.getPhones()
            .subscribe((data) => this.phones = data);
    }

}
