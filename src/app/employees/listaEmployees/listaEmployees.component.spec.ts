/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListaEmployeesComponent } from './listaEmployees.component';

describe('ListaEmployeesComponent', () => {
  let component: ListaEmployeesComponent;
  let fixture: ComponentFixture<ListaEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
