import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { VisorDocumentosService } from './visor-documentos.service';
import { VisorDocumentosComponent } from './visor-documentos.component';
import { VisorDocumentosRoutingModule } from './visor-documentos-routing.module';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VisorDocumentosRoutingModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ],
  declarations: [VisorDocumentosComponent, PdfViewerComponent],
  providers: [VisorDocumentosService]
})
export class VisorDocumentosModule { }
