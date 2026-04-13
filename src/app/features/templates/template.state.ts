export interface TemplateState {
  selectedTemplate: string;
   label: string;
  style: 'classic' | 'modern' | 'minimal';
}

export const initialTemplateState: TemplateState = {
  selectedTemplate: 'professional',
  label: 'Professional',
  style: 'classic'

};


export interface ThemeState {
  selectedTheme: string;
  label: string;
  accent: string;
  accent2: string;
}

export const initialThemeState: ThemeState = {
  selectedTheme: 'amber',
  label: 'Amber',
  accent: '#ff9b1a',
  accent2: '#ffd074'
};