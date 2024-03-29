import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TeamFormComponent } from './team-form/team-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TeamFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
