import { Component, OnInit } from '@angular/core';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public librosArray: any = [];
  constructor() { }

  ngOnInit() {

    this.librosArray = [{
      idLibro: 1,
      portada: 'assets/img/portfolio/600x600/013.jpg',
      nombre: 'POLITICA, TECNOCRACIA Y ADMINISTRACION PUBLICA',
      autor: 'Oscar Diego Bautista',
      idCategoria: 1,
      categoria: 'graphic'
    },{
      idLibro: 2,
      portada: 'assets/img/portfolio/600x600/05.jpg',
      nombre: 'Tecnologías de información y Nueva Gestión Pública: experiencias de gobierno electrónico en México',
      autor: 'Carla Bonina',
      idCategoria: 1,
      categoria: 'web-design'
    },{
      idLibro: 3,
      portada: 'assets/img/portfolio/600x600/16.jpg',
      nombre: 'Bases Juridicas de la  Reforma Administrativa del Gobierno Federal',
      autor: 'Carla Bonina',
      idCategoria: 1,
      categoria: 'logos'
    },{
      idLibro: 4,
      portada: 'assets/img/portfolio/600x600/38.jpg',
      nombre: 'El Reglamento Interior y el Manual de Organización',
      autor: 'Secretaría de la presidencia',
      idCategoria: 1,
      categoria: 'identity'
    }];


    setTimeout(() => {

        // init cubeportfolio
        $('#js-grid-juicy-projects').cubeportfolio({
          filters: '#js-filters-juicy-projects',
          layoutMode: 'grid',
          defaultFilter: '*',
          animationType: 'quicksand',
          gapHorizontal: 35,
          gapVertical: 30,
          gridAdjustment: 'responsive',
          mediaQueries: [{
            width: 1500,
            cols: 5
          }, {
            width: 1100,
            cols: 4
          }, {
            width: 800,
            cols: 3
          }, {
            width: 480,
            cols: 2
          }, {
            width: 320,
            cols: 1
          }],
          caption: 'overlayBottomReveal',
          displayType: 'sequentially',
          displayTypeSpeed: 80,

          // lightbox
          lightboxGallery: false,
          lightboxDelegate: '.cbp-lightbox',
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

          // singlePage popup
          //singlePageDelegate: '.cbp-singlePage',
          //singlePageDeeplinking: false,
          //singlePageStickyNavigation: false,
          //singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
          /*singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;
    
            $.ajax({
              url: url,
              type: 'GET',
              dataType: 'html',
              timeout: 10000
            })
              .done(function(result) {
                t.updateSinglePage(result);
              })
              .fail(function() {
                t.updateSinglePage('AJAX Error! Please refresh the page!');
              });
          },*/
        });

    },3000);


  }

}
