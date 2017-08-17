import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaRevistaComponent } from './edita-revista.component';

describe('EditaRevistaComponent', () => {
  let component: EditaRevistaComponent;
  let fixture: ComponentFixture<EditaRevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaRevistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
