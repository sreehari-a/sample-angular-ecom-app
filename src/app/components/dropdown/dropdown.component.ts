import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() placeholder: string = 'Select';
  @Input() options: string[] = [];
  @Input() value: string = '';
  @Output() selectOption = new EventEmitter<Event>();
  constructor() { }

  ngOnInit(): void {
  }

  changeOption(event: Event) {
    this.selectOption.emit(event);
  }

}
