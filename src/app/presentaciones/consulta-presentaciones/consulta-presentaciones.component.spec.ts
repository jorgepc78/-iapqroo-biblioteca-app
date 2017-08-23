import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPresentacionesComponent } from './consulta-presentaciones.component';

describe('ConsultaPresentacionesComponent', () => {
  let component: ConsultaPresentacionesComponent;
  let fixture: ComponentFixture<ConsultaPresentacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPresentacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPresentacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
