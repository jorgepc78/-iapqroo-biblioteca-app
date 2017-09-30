import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCategoriasComponent } from './tree-categorias.component';

describe('TreeCategoriasComponent', () => {
  let component: TreeCategoriasComponent;
  let fixture: ComponentFixture<TreeCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
