/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { ItemCardComponent } from './item-card.component';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.counterEvent, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to cart', () => {
    component.count = 1;
    component.displayAddToCart = true;
    component.addToCart();
    expect(component.count).toEqual(1);
    expect(component.displayAddToCart).toEqual(false);
  });

  it('should increment', () => {
    component.count = 1; 
    component.onPlus();
    expect(component.count).toEqual(2);
  });

  it('should decrement', () => {
    component.count = 1; 
    component.onMinus();
    expect(component.count).toEqual(0);
  });

  it('should update count', () => {
    component.count = 1; 
    let event = {
      which: 50,
      target: {
        value: 1
      },
      preventDefault(){}
    }
    component.onKeyDown(event);
    expect(component.count).toEqual(1);
  });

  it('should erase count', () => {
    component.count = 1; 
    let event = {
      which: 8,
      target: {
        value: ''
      },
      preventDefault(){}
    }
    component.onKeyDown(event);
    component.onChange(event);
    expect(component.count).toEqual(0);
  });

  it('should not update count', () => {
    component.count = 1; 
    let event = {
      which: 1,
      target: {
        value: ''
      },
      preventDefault(){}
    }
    component.onKeyDown(event);
    expect(component.count).toEqual(1);
  });

  it('should display add to cart', () => {
    component.count = 1; 
    let event = {
      target: {
        value: ''
      } 
    }
    component.displayAddToCart = false;

    component.onChange(event);

    expect(component.count).toEqual(0);
    expect(component.displayAddToCart).toEqual(true);
  });

  it('should display add to cart 2', () => {
    component.count = 1; 
    let event = {
      target: {
        value: '0'
      } 
    }
    component.displayAddToCart = false;

    component.onChange(event);
    
    expect(component.count).toEqual(0);
    expect(component.displayAddToCart).toEqual(true);
  });
});
