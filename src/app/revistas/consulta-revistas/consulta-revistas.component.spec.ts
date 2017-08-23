import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRevistasComponent } from './consulta-revistas.component';

describe('ConsultaRevistasComponent', () => {
  let component: ConsultaRevistasComponent;
  let fixture: ComponentFixture<ConsultaRevistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaRevistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
