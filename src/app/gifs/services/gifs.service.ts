import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey: string = '5BuYHsXkXO3GW9k5oFaTlfSR5XiOGODO';
  private url: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready', this.SaveLocalStorage());
  }

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
    this.SaveLocalStorage();
  }

  /* LocalStorage--> hacer persistente la información, salvar localSotrage */

  private SaveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  /* Cargar LocalStorage*/

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    /* Para que se quede los ultimos gifs en la pg */
    if (this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
        /* console.log('Gifs: ' , this.gifList); */
      });
  }
}
