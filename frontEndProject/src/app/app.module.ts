import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// components
import { AppComponent } from './app.component';

// Modules
import { CustomHttpModule } from './../coreClasses/CustomHttpModule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: CustomHttpModule, useClass: CustomHttpModule
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
