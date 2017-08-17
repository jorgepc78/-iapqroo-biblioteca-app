import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRevistasComponent } from './admin-revistas.component';

describe('AdminRevistasComponent', () => {
  let component: AdminRevistasComponent;
  let fixture: ComponentFixture<AdminRevistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRevistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
