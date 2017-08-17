import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPresentacionComponent } from './edita-presentacion.component';

describe('EditaPresentacionComponent', () => {
  let component: EditaPresentacionComponent;
  let fixture: ComponentFixture<EditaPresentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaPresentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
