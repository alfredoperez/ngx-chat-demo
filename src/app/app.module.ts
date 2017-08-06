import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { SharedModule } from './shared/shared.module';
import { MdIconRegistry } from '@angular/material';
import { CoreModule } from './core/core.module';


const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule.withServerTransition({appId: 'ngx-starter'}),
    BrowserAnimationsModule,
    ServiceWorkerModule,

    // 3rd party
    PerfectScrollbarModule.forRoot(perfectScrollbarConfig),

    // App
    SharedModule,
    CoreModule,
    routing

  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
