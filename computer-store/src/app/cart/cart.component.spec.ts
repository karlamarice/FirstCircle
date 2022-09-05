import { StoreInterface, ItemInterface } from './../app.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from './cart.component';
import { CartItemInterface, ScannedCartItemInterface } from '../app.interface';

const items: ItemInterface[] = [
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

const scannedCart: ScannedCartItemInterface[] = [
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

const cart: CartItemInterface[] = [
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

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({});
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {items, cart}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    component.cart = cart;
    expect(component).toBeInstanceOf(CartComponent);
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

  describe('should scanCart', () => {
    it('freebie promo', () => {
      component.cart = cart;
      expect(component.scannedCart.length).toBeGreaterThan(0);
    })

    it('for each deal', () => {
      cart[2].qty = 3;
      component.cart = cart;

      expect(component.scannedCart.length).toBeGreaterThan(0);
    })

    it('for each deal', () => {
      cart[2].qty = 4;
      component.cart = cart;

      expect(component.scannedCart.length).toBeGreaterThan(0);
    })

    it('bulk discount', () => {
      cart[1].qty = 5;
      component.cart = cart;

      expect(component.scannedCart.length).toBeGreaterThan(0);
    })
  })
});