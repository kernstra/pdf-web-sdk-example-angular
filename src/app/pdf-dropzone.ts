import { Component, input, output, signal } from '@angular/core';

// The landing page: takes a PDF from the file picker or a drop.
@Component({
  selector: 'app-pdf-dropzone',
  templateUrl: './pdf-dropzone.html',
  host: { style: 'display: contents' },
})
export class PdfDropzone {
  /** The framework this example is written in, shown on the page. */
  readonly framework = input.required<string>();
  /** Why the last file did not open, if it did not. */
  readonly error = input<string>();
  readonly file = output<File>();

  protected readonly dragging = signal(false);

  protected onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // so choosing the same file again fires `change`
    if (file) this.file.emit(file);
  }

  protected onDragOver(event: DragEvent) {
    event.preventDefault(); // allow the drop
    this.dragging.set(true);
  }

  protected onDrop(event: DragEvent) {
    event.preventDefault(); // keep the browser from opening the file itself
    this.dragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) this.file.emit(file);
  }
}
