import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpModule } from '@angular/http';
import { DataModule } from './data/data.module';

const MODULES = [
  DataModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ...MODULES
  ],
  exports: [...MODULES],
  declarations: [],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
