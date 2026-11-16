import { Component, signal } from '@angular/core';
import { DocumentViewer } from './document-viewer';
import { PdfDropzone } from './pdf-dropzone';

@Component({
  imports: [PdfDropzone, DocumentViewer],
  selector: 'app-root',
  templateUrl: './app.html',
  host: { class: 'app' },
})
export class App {
  protected readonly framework = 'Angular';
  protected readonly file = signal<File | undefined>(undefined);
  protected readonly error = signal<string | undefined>(undefined);

  protected pick(picked: File) {
    const isPdf = picked.type === 'application/pdf' || picked.name.toLowerCase().endsWith('.pdf');
    this.error.set(isPdf ? undefined : `${picked.name} is not a PDF.`);
    if (isPdf) this.file.set(picked);
  }

  // Back to the landing page, saying why.
  protected fail({ file, error }: { file: File; error: unknown }) {
    console.error(error);
    this.error.set(`Could not open ${file.name}: ${error instanceof Error ? error.message : error}`);
    this.file.set(undefined);
  }
}
