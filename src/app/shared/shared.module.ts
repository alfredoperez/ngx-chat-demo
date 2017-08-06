import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

const COMPONENTS = [LoadingOverlayComponent];
const PIPES = [];

const MODULES = [
  CommonModule,
  FlexLayoutModule,
  PerfectScrollbarModule,

  MdIconModule,
  MdInputModule,
  MdButtonModule,
  MdSidenavModule,
  MdToolbarModule,
  MdMenuModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES]
})
export class SharedModule {
}
