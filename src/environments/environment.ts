// Filled in at build time: scripts/ng.mjs passes
//   --define "KERNSTRA_LICENSE='<your key>'"
// from KERNSTRA_LICENSE in your environment or .env.local.
declare const KERNSTRA_LICENSE: string | undefined;

export const environment = {
  // Empty when the CLI ran without --define (a bare `ng serve`): the SDK then
  // shows its "License required" popup instead of the page failing to load.
  kernstraLicense: typeof KERNSTRA_LICENSE === 'string' ? KERNSTRA_LICENSE : '',
};
