import { createAction } from '@ngrx/store';

export const selectTemplate = createAction(
  '[Template] Select Template',
  (template: string) => ({ template })
);

export const selectTheme = createAction(
  '[Template] Select Theme',
  (theme: string) => ({ theme })
);