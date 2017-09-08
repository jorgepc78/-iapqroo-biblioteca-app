import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionRegistroComponent } from './confirmacion-registro.component';

describe('ConfirmacionRegistroComponent', () => {
  let component: ConfirmacionRegistroComponent;
  let fixture: ComponentFixture<ConfirmacionRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
