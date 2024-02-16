import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
})
export class NavbarComponent{
  @Input() hideSearchForm: boolean = false;
  @Output() searchEvent = new EventEmitter<string>(); 
 
  constructor() { }
 
  buscarHeroe(texto: string): void {
    this.searchEvent.emit(texto);
  }

}
