import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaDocumentoComponent } from './edita-documento.component';

describe('EditaDocumentoComponent', () => {
  let component: EditaDocumentoComponent;
  let fixture: ComponentFixture<EditaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
