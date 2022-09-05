import { ItemInterface, CartItemInterface, PromosInterface } from './../app.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() itemName: string = 'Shiba Inu';
  @Input() itemPrice: number = 3;
  @Input() itemSku: string = '';
  @Input() itemPromo: PromosInterface = {
    type: '',
    title: '',
    sku: '',
    qty: 0,
    qtyFree: 0,
    discountedPrice: 0,
    skuFree: '',
    titleFree: ''
  }

  @Output() counterEvent = new EventEmitter<CartItemInterface>;
  
  count: number = 1;
  displayAddToCart: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  addToCart(): void {
    this.count = 1;
    this.displayAddToCart = false;
    this.emitCounterEvent();
  }

  emitCounterEvent(): void {
    this.counterEvent.emit({
      sku: this.itemSku,
      name: this.itemName,
      price: this.itemPrice,
      qty: this.count,
      promo: this.itemPromo
    });
  }

  onPlus(): void {
    this.count++;
    this.emitCounterEvent();
  }

  onMinus(): void {
    if (this.count > 0) {
      this.count--;
      this.emitCounterEvent();
    } 
    if (this.count === 0) {
      this.displayAddToCart = true;
    }
  }

  onKeyDown(event: any) {
    if ((event.which > 47 && event.which < 58) || event.which === 8) {
      this.count = event.target.value;
      this.emitCounterEvent();
    } else {
      event.preventDefault();
    }
  }

  onChange(event: any) {
    if (event.target.value === '' || event.target.value === '0') {
      this.count = 0;
      this.displayAddToCart = true;
      this.emitCounterEvent();
    }
  }
}