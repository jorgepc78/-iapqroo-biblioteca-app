import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRealizadoComponent } from './registro-realizado.component';

describe('RegistroRealizadoComponent', () => {
  let component: RegistroRealizadoComponent;
  let fixture: ComponentFixture<RegistroRealizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRealizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
