import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresentacionesComponent } from './admin-presentaciones.component';

describe('AdminPresentacionesComponent', () => {
  let component: AdminPresentacionesComponent;
  let fixture: ComponentFixture<AdminPresentacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPresentacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPresentacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
