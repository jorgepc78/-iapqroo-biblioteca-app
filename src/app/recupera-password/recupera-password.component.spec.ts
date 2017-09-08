import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaPasswordComponent } from './recupera-password.component';

describe('RecuperaPasswordComponent', () => {
  let component: RecuperaPasswordComponent;
  let fixture: ComponentFixture<RecuperaPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperaPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
