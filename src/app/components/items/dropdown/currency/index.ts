import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'dropdown-currency',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class DropdownCurrencyComponent {
    @Input()
    public object: any = undefined;

    @Input()
    public isSelected = false;

    constructor(private router: Router) {
    }
}