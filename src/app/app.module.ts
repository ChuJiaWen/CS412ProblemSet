import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { ChildResponseComponent } from './child-response/child-response.component';
import { HttpClientModule, HttpClient, HttpHandler } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ChildFormComponent,
    ChildResponseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
