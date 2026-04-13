import { createAction } from '@ngrx/store';
import {ResumeTemplate,ThemeColor} from './templates.component';

export const selectTemplate = createAction(
  '[Template] Select Template',
  (template: ResumeTemplate) => ({ template })
);

export const selectTheme = createAction(
  '[Template] Select Theme',
  (theme: ThemeColor) => ({ theme })
);