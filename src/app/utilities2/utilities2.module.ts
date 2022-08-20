import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Utilities2RoutingModule } from './utilities2-routing.module';
import { ColorsComponent } from './colors/colors.component';


@NgModule({
  declarations: [

    ColorsComponent
  ],
  imports: [
    CommonModule,
    Utilities2RoutingModule
  ]
})
export class Utilities2Module { }
