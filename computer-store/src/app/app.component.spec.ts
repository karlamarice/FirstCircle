import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartItemInterface, StoreInterface } from './app.interface';
import { map, of, pipe, take } from 'rxjs';
import { CartComponent } from './cart/cart.component';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('Window');

const appServiceStub = jasmine.createSpyObj('AppService', [
  'getStoreConfig'
]);

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

const cart: CartItemInterface[] = [
  {
    name: "Apple TV",
    price: 109.5,
    qty: 3,
    sku: "atv",
    promo:{
      qty: 3,
      qtyFree: 1,
      sku: "atv",
      title: "3-for-2",
      type: "forEachDeal",
      discountedPrice: 0,
      skuFree: '',
      titleFree: ''
    }
  }
];

const windowMock = {
  location: {
    reload: jasmine.createSpy('reload')
  }
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let appServiceSpy: jasmine.SpyObj<AppService>;

  let item: CartItemInterface = {
    name: "Apple TV",
    price: 109.5,
    qty: 4,
    sku: "atv",
    promo:{
      qty: 3,
      qtyFree: 1,
      sku: "atv",
      title: "3-for-2",
      type: "forEachDeal",
      discountedPrice: 0,
      skuFree: '',
      titleFree: ''
    }
  }

  let item2: CartItemInterface = {
    name: "Super iPad",
    price: 549.99,
    qty: 4,
    sku: "ipd",
    promo: {
      discountedPrice: 499.99,
      qty: 4,
      sku: "ipd",
      title: "Discount",
      type: "bulkDiscount",
      qtyFree: 0,
      skuFree: '',
      titleFree: ''
    }
  };

  let item3: CartItemInterface = {
    name: "MacBook Pro",
    price: 1399.99,
    qty: 1,
    sku: "mbp",
    promo:{
      qty: 1,
      qtyFree: 1,
      sku: "mbp",
      skuFree: "vga",
      title: "",
      titleFree: "VGA adapter",
      type: "freebie",
      discountedPrice: 0
    } 
  }

  let cart2: CartItemInterface[] = [
    {
      name: "Super iPad",
      price: 549.99,
      qty: 4,
      sku: "ipd",
      promo: {
        discountedPrice: 499.99,
        qty: 4,
        sku: "ipd",
        title: "Discount",
        type: "bulkDiscount",
        qtyFree: 0,
        skuFree: '',
        titleFree: ''
      }
    }
  ]

  beforeEach(async () => {
    const httpClientStub = () => ({
      get: (arg: any) => ({
        subscribe: () => ({
          next: (d: any) => d({}),
          error: (e: any) => e({})
        })
      })
    });
    const matDialogStub = () => ({
      open: () => ({})
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HttpClient, 
          useFactory: httpClientStub
        },
        {
          provide: MAT_DIALOG_DATA,
          useFactory: matDialogStub
        },
        {
          provide: MatDialog,
          useFactory: matDialogStub
        },
        {
          provide: AppService,
          useValue: appServiceStub
        },
        {
          provide: Window, 
          useValue: windowMock
        }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    appServiceSpy = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.dialog = TestBed.inject(MatDialog)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'computer-store'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('computer-store');
  });

  it('should get store config', () => {
    appServiceSpy.getStoreConfig.and.returnValue(of(configuration));

    component.ngOnInit();

    appServiceSpy.getStoreConfig().subscribe((config) => {
      expect(component.items).toEqual(config.items);
    })
  });

  it('should not get store config', () => {
    let sampleConfig: StoreInterface = {
      items: []
    };
    appServiceSpy.getStoreConfig.and.returnValue(of(sampleConfig));

    component.ngOnInit();

    expect(appServiceSpy.getStoreConfig).toHaveBeenCalled();
  });

  it('should update cart', () => {
    component.cart = cart;

    component.updateCart(item);

    expect(component.cart[0].qty).toEqual(4);
  });

  it('should add item', () => {
    component.cart = cart;

    component.updateCart(item2);
    component.updateCart(item3); 
 
    expect(component.cart.length).toBeGreaterThan(1);
  });

  it('should remove item', () => {
    component.cart = cart;
    item3.qty = 0;

    component.updateCart(item3);

    expect(component.cart.length).toEqual(2);
  });

  it('should open dialog', () => {
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<typeof component>);

    let dialogRef = component.dialog.open(CartComponent, {
      data: {
        items: configuration.items,
        cart: cart2
      }
    });

    component.openDialog(configuration.items, cart2);

    dialogRef.afterClosed().subscribe((isClosed) => {
      expect(isClosed).toEqual(true);
    })
  });

  it('should reload', () => {
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<typeof component>);

    let dialogRef = component.dialog.open(CartComponent, {
      data: {
        items: configuration.items,
        cart: []
      }
    });

    component.openDialog(configuration.items, []);

    dialogRef.afterClosed().subscribe((isClosed) => {
      component.cart = cart;
      expect(component.cart.length).toBeGreaterThan(0);
      expect(isClosed).toEqual(true);
    })
  })
});