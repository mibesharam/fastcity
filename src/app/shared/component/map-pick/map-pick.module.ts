import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPickComponent } from './map-pick.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [MapPickComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey
    })
  ],
  exports: [MapPickComponent]
})
export class MapPickModule { }
