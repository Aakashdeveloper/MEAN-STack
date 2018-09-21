import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../services/phoneService.service';
import { ActivatedRoute, Router} from '@angular/router';
import { IPhone } from '../models/phoneData.model';

@Component({
    templateUrl: './phoneDetail.component.html'
})

export class PhoneDetailComponent implements OnInit {
    id: String;
    phonedetail: IPhone[];

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private  _phoneSerivce: PhoneService) {}


    ngOnInit(): void {
            this.id = this._route.snapshot.params['id'];

            this._phoneSerivce.getPhonesDetails(this.id)
                .subscribe((data) => this.phonedetail = data[0]);
    }

    onBack(): void {
        this._router.navigate(['/phone']);
    }
}
