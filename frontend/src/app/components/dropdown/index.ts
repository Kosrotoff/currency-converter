import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'dropdown',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class DropdownComponent {
    @Input()
    public type: string;

    @Input()
    public list: any[];

    public selected = 0;

    @Output() onSelected = new EventEmitter<any>()
    public click(increased: any) {
        this.selected = this.list.indexOf(increased);
        this.onSelected.emit(increased);
    }

    public isActive = false;
}
