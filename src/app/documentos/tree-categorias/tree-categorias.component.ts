import { Component, Input } from '@angular/core';
import { MessageService           } from '../consulta-documentos/message.service';

@Component({
  selector: 'app-tree-categorias',
  templateUrl: './tree-categorias.component.html',
  styleUrls: ['./tree-categorias.component.css']
})
export class TreeCategoriasComponent {

  @Input('data') items: Array<Object>;

  constructor(
    private messageService: MessageService
  ) {}

  muestraDocumentosCat(idCategoria) {
    this.messageService.disparaEvento(idCategoria);
  }

}