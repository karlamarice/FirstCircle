import { ItemInterface, PromosInterface, StoreInterface, CartItemInterface } from './app.interface';
import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'computer-store';
  items: ItemInterface[] = [];
  cart: CartItemInterface[] = [];

  constructor(
    private appService: AppService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.appService.getStoreConfig().subscribe((config: StoreInterface) => {
      if (config.items.length > 0) {
        this.items = config.items;
      } else {
        console.log("Loading Config Failed");
      }
    });
  }

  updateCart(updatedItem: CartItemInterface): void {
    if (this.cart.filter(item => item.sku === updatedItem.sku).length > 0) {
      this.cart.forEach((item, index) => {
        if(item.sku == updatedItem.sku){
          if (updatedItem.qty != 0) {
            item.qty = updatedItem.qty;
          } else {
            this.cart.splice(index, 1);
          }
        }
      });
    } else {
      this.cart.push(updatedItem);
    }
  }

  openDialog(items: ItemInterface[], cart: CartItemInterface[]) {
    this.dialog.open(CartComponent, {
      data: {
        items: items,
        cart: cart
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        alert('Thank you!');
        if (this.cart.length != 0) {
          window.location.reload();
        }
      }
    });
  }
}
