import { CartItemInterface, ItemInterface, PromosInterface, DialogInterface, ScannedCartItemInterface } from './../app.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  items: ItemInterface[] = [];
  cart: CartItemInterface[] = [];
  scannedCart: ScannedCartItemInterface[] = [];
  displayedColumns: string[] = ['item', 'quantity', 'cost', 'promo', 'total'];

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface
  ) {
    
  }

  ngOnInit() {
    this.cart = this.data.cart;
    this.items = this.data.items;
    this.scanCart();
  }

  scanCart(): void {
    let totalCost = 0;
    this.scannedCart = [];
    
    this.cart.forEach((cartItem) => {
      let item = this.items.filter(item => item.sku === cartItem.sku)[0];
      let freeItem: ScannedCartItemInterface = {
        sku: '',
        name: '',
        price: 0,
        promo: {
          type: '',
          title: '',
          sku: '',
          qty: 0,
          qtyFree: 0,
          discountedPrice: 0,
          skuFree: '',
          titleFree: ''
        },
        qty: 0,
        total: 0
      }
      let scannedItem: ScannedCartItemInterface = {
        sku: cartItem.sku,
        name: cartItem.name,
        price: cartItem.price,
        promo: cartItem.promo,
        qty: cartItem.qty,
        total: 0
      };

      if (item.promo) {
        switch(item.promo.type) {
          case 'forEachDeal': {
            let notIncluded = cartItem.qty % 3;
            let included = Math.floor(cartItem.qty/cartItem.promo.qty) * 2;
  
            if (cartItem.qty > 2 && included != 0 ) {
              totalCost = included * item.price;
  
              if (notIncluded != 0) {
                totalCost = totalCost + (notIncluded * item.price);
              }
              scannedItem.promo.title = item.promo.title;
            } else {
              totalCost = cartItem.qty * item.price;
              scannedItem.promo.title = '';
            }
            break;
          }
          case 'bulkDiscount': {
            if (cartItem.qty > 3) {
              totalCost = cartItem.qty * item.promo.discountedPrice;
              scannedItem.promo.title = item.promo.title;
            } else {
              totalCost = cartItem.qty * item.price;
              scannedItem.promo.title = '';
            }
            break;
          }
          case 'freebie': {
            freeItem = {
              sku: item.promo.skuFree,
              name: item.promo.titleFree,
              price: 0,
              qty: cartItem.qty,
              promo: {
                type: '',
                title: '',
                sku: '',
                qty: 0,
                qtyFree: 0,
                discountedPrice: 0,
                skuFree: '',
                titleFree: ''
              },
              total: 0
            }
            scannedItem.promo.title = '';
            totalCost = cartItem.qty * item.price;
            break;
          }
          default: {
            totalCost = cartItem.qty * item.price;
            break;
          }
        }
      }
      
      scannedItem.total = totalCost;
      this.scannedCart.push(scannedItem);

      if (freeItem.qty != 0) {
        this.scannedCart.push(freeItem);
      }
    })
  }

  getCartTotalCost(): number {
    let cartTotal = 0;
    this.scannedCart.forEach((cartItem) => {
      cartTotal = cartTotal + cartItem.total;
    });

    return cartTotal;
  }

  clearCart(): void {
    this.cart = [];
    this.scannedCart = [];
  }
}
