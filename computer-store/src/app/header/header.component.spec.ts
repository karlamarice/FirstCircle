/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onMenuClick', () => {
    spyOn(component.menuToggle, 'emit').and.callThrough();
    component.onMenuClick();
    expect(component.menuToggle.emit).toHaveBeenCalled();
  })

  it('should emit onCartClick', () => {
    spyOn(component.cartToggle, 'emit').and.callThrough();
    component.onCartClick();
    expect(component.cartToggle.emit).toHaveBeenCalled();
  })
});
