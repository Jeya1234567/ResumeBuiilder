import { createReducer,on } from "@ngrx/store";
import { selectTemplate, selectTheme } from "./template.action";
import { initialTemplateState,initialThemeState } from "./template.state";

export const templateReducer = createReducer(
    initialTemplateState,
    on(selectTemplate, (state, { template }) => ({
        ...state,
        selectedTemplate: template
    }))
)

export const themeReducer = createReducer(
    initialThemeState,
    on(selectTheme, (state, { theme }) => ({
        ...state,
        selectedTheme: theme
    }))
)