import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPublicacionComponent } from './edita-publicacion.component';

describe('EditaPublicacionComponent', () => {
  let component: EditaPublicacionComponent;
  let fixture: ComponentFixture<EditaPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
