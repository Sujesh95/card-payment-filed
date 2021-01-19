import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  @Input('message') message: string;
  @Output() event = new EventEmitter<boolean>();

  ngOnInit() {
  }
  
  onClose() {
    this.event.emit(false);
  }

}
