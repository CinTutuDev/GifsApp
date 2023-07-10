import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CardListComponent } from './components/card-list/card-list.component';
import { GifsComponent } from './components/gifs-card/gifs-card.component';
import { HomePageComponent } from './pages/home/home.component';
import { ShearchBoxComponent } from './components/shearch-box/shearch-box.component';

@NgModule({
  declarations: [
    CardListComponent,
    GifsComponent,
    HomePageComponent,
    ShearchBoxComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HomePageComponent],
})
export class GifsModule {}
