import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPublicacionesComponent } from './consulta-publicaciones.component';

describe('ConsultaPublicacionesComponent', () => {
  let component: ConsultaPublicacionesComponent;
  let fixture: ComponentFixture<ConsultaPublicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPublicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
