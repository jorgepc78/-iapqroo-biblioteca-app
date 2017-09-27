import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeAdminCategoriasComponent } from './tree-admin-categorias.component';

describe('TreeAdminCategoriasComponent', () => {
  let component: TreeAdminCategoriasComponent;
  let fixture: ComponentFixture<TreeAdminCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeAdminCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeAdminCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
