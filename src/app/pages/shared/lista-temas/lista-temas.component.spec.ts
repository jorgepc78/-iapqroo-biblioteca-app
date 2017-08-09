import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTemasComponent } from './lista-temas.component';

describe('ListaTemasComponent', () => {
  let component: ListaTemasComponent;
  let fixture: ComponentFixture<ListaTemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
