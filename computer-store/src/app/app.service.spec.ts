import { ConfigService } from './services/config.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { StoreInterface } from './app.interface';
import { config, Observable, of } from 'rxjs';

describe('Service: App', () => {
  let service: AppService;
  let configService: ConfigService;
  const configuration: StoreInterface = {
    "items": [
      {
        "sku": "ipd",
        "name": "Super iPad",
        "price": 549.99,
        "promo": {
          "type": "bulkDiscount",
          "title": "Discount",
          "sku": "ipd",
          "qty": 4,
          "discountedPrice": 499.99,
          "qtyFree": 0,
          "skuFree": '',
          "titleFree": ''
        }
      },
      {
        "sku": "mbp",
        "name": "MacBook Pro",
        "price": 1399.99,
        "promo": 
        {
          "type": "freebie",
          "title": "Free",
          "sku": "mbp",
          "qty": 1,
          "skuFree": "vga",
          "titleFree": "VGA adapter",
          "qtyFree": 1,
          "discountedPrice": 0
        }
      },
      {
        "sku": "atv",
        "name": "Apple TV",
        "price": 109.50,
        "promo": {
            "type": "forEachDeal",
            "title": "3-for-2",
            "sku": "atv",
            "qty": 3,
            "qtyFree": 1,
            "discountedPrice": 0,
            "skuFree": '',
            "titleFree": ''
        }
      },
      {
        "sku": "vga",
        "name": "VGA adapter",
        "price": 30.00,
        "promo": {
          "type": "",
          "title": "",
          "sku": "",
          "qty": 0,
          "qtyFree": 0,
          "discountedPrice": 0,
          "skuFree": '',
          "titleFree": ''
        }
      }
    ]
  };

  beforeEach(() => {
    class MockConfigService {
      loadStoreConfig(): Observable<StoreInterface> {
        return of(configuration);
      }
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigService,
          useClass: MockConfigService
        }
      ]
    });

    service = TestBed.inject(AppService);
    configService = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get store config', () => {
    spyOn(configService, 'loadStoreConfig').and.returnValue(of(configuration));

    service.getStoreConfig();

    service.getStoreConfig().subscribe((config) => {
      expect(config).toEqual(configuration);
    });
  });
});
