import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MessageService {

  // Observable string sources
  private eventoAnunciadoSource = new Subject<number>();

  // Observable string streams
  eventoAnunciado$ = this.eventoAnunciadoSource.asObservable();

  // Service message commands
  disparaEvento(idCategoria: number) {
    this.eventoAnunciadoSource.next(idCategoria);
  }

}
