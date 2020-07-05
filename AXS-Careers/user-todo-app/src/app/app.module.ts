import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MemberService } from './memberService';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { ListMemberComponent } from './list-member/list-member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MessageService } from 'primeng/api';
import { TitleCaseDirective } from './title-case.directive';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ListMemberComponent,
    AddMemberComponent,
    TitleCaseDirective
  ],
  bootstrap: [AppComponent],
  providers: [MemberService, MessageService],
})
export class AppModule {}
