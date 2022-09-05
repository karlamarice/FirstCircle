import { ItemInterface, PromosInterface, CartItemInterface, StoreInterface } from './../app.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private http: HttpClient
  ) { }

  loadStoreConfig(): Observable<StoreInterface> {
    return this.http.get<StoreInterface>(`../../assets/config/store.json`)
  }
}
