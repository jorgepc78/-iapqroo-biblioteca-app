import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaLibroComponent } from './edita-libro.component';

describe('EditaLibroComponent', () => {
  let component: EditaLibroComponent;
  let fixture: ComponentFixture<EditaLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
