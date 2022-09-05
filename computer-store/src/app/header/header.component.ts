import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter;
  @Output() cartToggle = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  onMenuClick(): void {
    this.menuToggle.emit();
  }

  onCartClick(): void {
    this.cartToggle.emit();
  }
}
