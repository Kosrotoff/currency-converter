import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'dropdown',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class DropdownComponent {
    @Input()
    public type: string = "";

    @Input()
    public list: any[] = [];

    public selected = 0;

    @Output() onSelected = new EventEmitter<boolean>()
    click(increased: any) {
        this.selected = this.list.indexOf(increased);
        this.onSelected.emit(increased)
    }

    public isActive = false;

    constructor(private router: Router) {
    }
}