import { createFeatureSelector,createSelector } from "@ngrx/store";
import { TemplateState,ThemeState } from "./template.state";

export const selectTemplateState = createFeatureSelector<TemplateState>('template');
export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectedTemplateState = createSelector(
    selectTemplateState,
    (state) => state.selectedTemplate
);

export const selectedThemeState = createSelector(
    selectThemeState,
    (state) => state.selectedTheme
);

export const selectedAccentState = createSelector(
    selectThemeState,
    (state) => state.accent
);

export const selectedAccent2State = createSelector(
    selectThemeState,
    (state) => state.accent2
);