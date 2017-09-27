import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaVideoComponent } from './edita-video.component';

describe('EditaVideoComponent', () => {
  let component: EditaVideoComponent;
  let fixture: ComponentFixture<EditaVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
