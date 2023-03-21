/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LvFormComponent } from './lv-form.component';

describe('LvFormComponent', () => {
  let component: LvFormComponent;
  let fixture: ComponentFixture<LvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
