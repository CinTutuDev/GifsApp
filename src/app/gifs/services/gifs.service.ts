import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagHistory: string[] = [];

  constructor() {}

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    /* Lo pasamos a minusculas */
    tag = tag.toLowerCase();

    /* Si el tagHistory incluye el tag nuevo lo elimino*/
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldtag) => oldtag !== tag);
    }
    /* y lo inserto */
    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagsHistory.splice(0, 10);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    console.log(this._tagHistory);
  }
}
