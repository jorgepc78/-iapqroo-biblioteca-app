import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentosComponent } from './admin-documentos.component';

describe('AdminDocumentosComponent', () => {
  let component: AdminDocumentosComponent;
  let fixture: ComponentFixture<AdminDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
