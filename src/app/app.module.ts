import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MDLDirective } from './mdl.directive';
import { MessageListComponent } from './message/message-list.component';
import { MessageComponent } from './message/message.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    MDLDirective,
    MessageListComponent,
    MessageComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
