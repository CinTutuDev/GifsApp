import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-shearch-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class ShearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsS: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsS.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

    console.log({ newTag });
  }
}
