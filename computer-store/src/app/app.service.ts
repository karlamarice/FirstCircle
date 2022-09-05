import { ConfigService } from './services/config.service';
import { Injectable } from '@angular/core';
import { ItemInterface, PromosInterface, StoreInterface } from './app.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private configService: ConfigService
  ) {
  }

  getStoreConfig(): Observable<StoreInterface> {
    return this.configService.loadStoreConfig();
  }
}
