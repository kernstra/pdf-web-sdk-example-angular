import { Injectable } from '@angular/core';
import { Kernstra } from '@kernstra/pdf-web-sdk';
// Both environment files export environment.kernstraLicense from the global
// KERNSTRA_LICENSE, and the CLI fills it in from your variable (scripts/ng.mjs):
//   ng serve --define "KERNSTRA_LICENSE='$KERNSTRA_LICENSE'"
import { environment } from '../environments/environment';

// Owns the SDK's options; nothing runs until init() is first called.
@Injectable({ providedIn: 'root' })
export class KernstraService {
  init() {
    return Kernstra.init({ license: environment.kernstraLicense });
  }
}
