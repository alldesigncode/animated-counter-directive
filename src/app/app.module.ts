import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { AnimatedCounterDirective } from './directives/animated-counter.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AnimatedCounterDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
