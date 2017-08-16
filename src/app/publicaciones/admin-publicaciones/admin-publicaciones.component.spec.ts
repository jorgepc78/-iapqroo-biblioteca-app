import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublicacionesComponent } from './admin-publicaciones.component';

describe('AdminPublicacionesComponent', () => {
  let component: AdminPublicacionesComponent;
  let fixture: ComponentFixture<AdminPublicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPublicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
