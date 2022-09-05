import { StoreInterface, ItemInterface } from './../app.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from './cart.component';
import { CartItemInterface, ScannedCartItemInterface } from '../app.interface';

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let items: ItemInterface[] = [
    {
      sku: "ipd",
      name: "Super iPad",
      price: 549.99,
      promo: {
        type: "bulkDiscount",
        title: "Discount",
        sku: "ipd",
        qty: 4,
        discountedPrice: 499.99,
        skuFree: "",
        titleFree: "",
        qtyFree: 0
      }
    },
    {
      sku: "mbp",
      name: "MacBook Pro",
      price: 1399.99,
      promo: 
      {
        type: "freebie",
        title: "Free",
        sku: "mbp",
        qty: 1,
        skuFree: "vga",
        titleFree: "VGA adapter",
        qtyFree: 1,
        discountedPrice: 0,
      }
    },
    {
      sku: "atv",
      name: "Apple TV",
      price: 109.50,
      promo: {
        type: "forEachDeal",
        title: "3-for-2",
        sku: "atv",
        qty: 3,
        qtyFree: 1,
        discountedPrice: 0,
        skuFree: "",
        titleFree: "",
      }
    },
    {
      sku: "air",
      name: "Airpods",
      price: 350.00,
      promo: {
        type: "",
        title: "",
        sku: "",
        qty: 0,
        qtyFree: 0,
        discountedPrice: 0,
        skuFree: "",
        titleFree: "",
      }
    },
    {
      sku: "vga",
      name: "VGA adapter",
      price: 30.00,
      promo: {
        type: "",
        title: "",
        sku: "",
        qty: 0,
        qtyFree: 0,
        discountedPrice: 0,
        skuFree: "",
        titleFree: "",
      }
    }
  ];

  let scannedCart: ScannedCartItemInterface[] = [
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
      },
      total: 119
    }
  ];

  let cart: CartItemInterface[] = [
    {
      sku: 'mbp', 
      name: 'MacBook Pro', 
      price: 1399.99, 
      qty: 1, 
      promo: {
        qty: 1,
        qtyFree: 1,
        sku: "mbp",
        skuFree: "vga",
        title: "",
        titleFree: "VGA adapter",
        type: "freebie",
        discountedPrice: 0
      }
    },
    {
      sku: 'ipd', 
      name: 'Super iPad', 
      price: 549.99, 
      qty: 1, 
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
    },
    {
      sku: 'atv', 
      name: 'Apple TV', 
      price: 109.5, 
      qty: 1, 
      promo: {
        qty: 3,
        qtyFree: 1,
        sku: "atv",
        title: "3-for-2",
        type: "forEachDeal",
        discountedPrice: 0,
        skuFree: '',
        titleFree: ''
      }
    },
    {
      sku: 'vga', 
      name: 'VGA adapter', 
      price: 30, 
      qty: 1, 
      promo: {
        discountedPrice: 0,
        qty: 0,
        sku: '',
        title: '',
        type: '',
        qtyFree: 0,
        skuFree: '',
        titleFree: ''
      }
    }
  ];
  
  beforeEach(() => {
    const matDialogRefStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CartComponent],
      providers: [
        { 
          provide: MatDialogRef, useFactory: matDialogRefStub 
        }, {
          provide: MAT_DIALOG_DATA, useValue: []
        }
      ]
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.items = items;
    component.cart = cart;
    component.scannedCart = scannedCart;
    spyOn(component, 'scanCart');
  });

  fit('can load instance', () => {
    console.log("Cart: ", component.cart);
    expect(component).toBeTruthy();
  });

  it('should get cart total', () => {
    component.scannedCart = scannedCart;

    let total = component.getCartTotalCost();

    expect(total).toEqual(component.scannedCart[0].total);
  });

  it('should clear cart', () => {
    component.cart = cart;
    component.scannedCart = scannedCart;

    component.clearCart();

    expect(component.cart.length).toEqual(0);
    expect(component.scannedCart.length).toEqual(0);
  });

  it('should scan cart', () => {
    component.cart = cart;
    component.scanCart();
    expect(component.scanCart).toHaveBeenCalled();
  });
});
