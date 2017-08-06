import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'loading-screen',
    template: `<h3>Loading...</h3>`
})
export class LoadingScreen { }
@NgModule({
    declarations: [LoadingScreen],
    imports: [RouterModule.forChild([
        { path: 'loading', component: LoadingScreen }
    ])],
})
export class LoadingModule { }