import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibrosComponent } from './admin-libros.component';

describe('AdminLibrosComponent', () => {
  let component: AdminLibrosComponent;
  let fixture: ComponentFixture<AdminLibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLibrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
