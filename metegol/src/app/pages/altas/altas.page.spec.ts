import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasPage } from './altas.page';

describe('AltasPage', () => {
  let component: AltasPage;
  let fixture: ComponentFixture<AltasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
