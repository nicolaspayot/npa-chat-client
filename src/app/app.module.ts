import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MDLDirective } from './mdl.directive';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { MessageListComponent } from './chat/message/message-list.component';
import { MessageComponent } from './chat/message/message.component';
import { InputComponent } from './chat/input/input.component';
import { MessageService } from './chat/message/message.service';
import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MDLDirective,
    LoginComponent,
    ChatComponent,
    MessageListComponent,
    MessageComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
