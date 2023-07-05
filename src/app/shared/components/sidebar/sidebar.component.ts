import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  constructor(private gifsS: GifsService) {}

  get tags(): string[] {
    return this.gifsS.tagsHistory;
  }

  searchTag(tag: string) {
    this.gifsS.searchTag(tag);

    this.tagInput.nativeElement.value = '';

    console.log({ tag });
  }
}
