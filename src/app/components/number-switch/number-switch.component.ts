import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-switch',
  templateUrl: './number-switch.component.html',
  styleUrls: ['./number-switch.component.css']
})
export class NumberSwitchComponent implements OnInit {
  @Input() value: number = 0;
  @Output() setValue= new EventEmitter<Event>();
  constructor() { }

  ngOnInit(): void {
  }

  changeValue(event: Event) {
    this.setValue.emit(event)
  }
}
