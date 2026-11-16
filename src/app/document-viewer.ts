import {
  Component, ElementRef, afterRenderEffect, inject, input, output, viewChild,
} from '@angular/core';
import { PDFDocument, PDFViewer } from '@kernstra/pdf-web-sdk';
import { KernstraService } from './kernstra.service';

@Component({
  selector: 'app-document-viewer',
  // The container needs a height: the host fills what the header leaves.
  template: `<div #host style="height: 100%"></div>`,
  host: { class: 'viewer' },
})
export class DocumentViewer {
  readonly file = input.required<File>();
  /** The file did not open. */
  readonly failed = output<{ file: File; error: unknown }>();
  private readonly host =
    viewChild.required<ElementRef<HTMLElement>>('host');
  private readonly kernstra = inject(KernstraService);

  constructor() {
    // Browser only, so server rendering never runs it. Runs again when
    // file changes; the cleanup runs first, and on destroy.
    afterRenderEffect((onCleanup) => {
      const file = this.file();
      const host = this.host().nativeElement;
      let doc: PDFDocument | undefined;
      let viewer: PDFViewer | undefined;
      let canceled = false;
      onCleanup(() => {
        canceled = true;
        viewer?.destroy();
        void doc?.close();
      });
      void (async () => {
        await this.kernstra.init();
        const opened = await PDFDocument.fromFile(file);
        if (canceled) return opened.close();
        doc = opened;
        viewer = new PDFViewer(host, opened);
      })().catch((error) => {
        if (!canceled) this.failed.emit({ file, error });
      });
    });
  }
}
