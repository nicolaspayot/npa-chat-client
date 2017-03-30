import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'npa-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  message = '';
  @Output() onSend = new EventEmitter<string>();

  sendMessage() {
    this.onSend.emit(this.message);
    this.message = '';
  }
}
