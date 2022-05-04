import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'not-found-component',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class NotFoundComponent {
    constructor(private router: Router) {
    }
}