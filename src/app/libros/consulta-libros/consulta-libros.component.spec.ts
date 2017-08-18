import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaLibrosComponent } from './consulta-libros.component';

describe('LibrosComponent', () => {
  let component: ConsultaLibrosComponent;
  let fixture: ComponentFixture<ConsultaLibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaLibrosComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
