import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-admin-categorias',
  templateUrl: './tree-admin-categorias.component.html',
  styleUrls: ['./tree-admin-categorias.component.css']
})
export class TreeAdminCategoriasComponent {

  @Input('data') items: Array<Object>;

}
