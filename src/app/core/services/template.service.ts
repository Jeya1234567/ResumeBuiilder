import { Injectable } from '@angular/core';

export interface ResumeTemplate {
  id: string;
  label: string;
  style: 'classic' | 'modern' | 'minimal';
}

export interface ThemeColor {
  id: string;
  label: string;
  accent: string;
  accent2: string;
}

const TEMPLATE_KEY = 'resume.template';
const THEME_KEY = 'resume.theme';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  templates: ResumeTemplate[] = [
    { id: 'professional', label: 'Professional', style: 'classic' },
    { id: 'timeline', label: 'Timeline', style: 'classic' },
    { id: 'split-header', label: 'Split Header', style: 'classic' },
    { id: 'compact-ats', label: 'Compact ATS', style: 'classic' },
    { id: 'classic-serif', label: 'Classic Serif', style: 'classic' },
    { id: 'modern', label: 'Modern', style: 'modern' },
    { id: 'project-first', label: 'Project First', style: 'modern' },
    { id: 'creative', label: 'Creative', style: 'modern' },
    { id: 'bold-sidebar', label: 'Bold Sidebar', style: 'modern' },
    { id: 'modern-accent-bar', label: 'Accent Bar', style: 'modern' },
    { id: 'modern-photo-left', label: 'Photo Left', style: 'modern' },
    { id: 'minimal', label: 'Minimal', style: 'minimal' },
    { id: 'clean-lines', label: 'Clean Lines', style: 'minimal' },
    { id: 'mono', label: 'Mono', style: 'minimal' },
    { id: 'air', label: 'Air', style: 'minimal' },
    { id: 'minimal-grid', label: 'Minimal Grid', style: 'minimal' }
  ];

  themes: ThemeColor[] = [
    { id: 'amber', label: 'Amber', accent: '#ff9b1a', accent2: '#ffd074' },
    { id: 'teal', label: 'Teal', accent: '#22a699', accent2: '#9adfd6' },
    { id: 'blue', label: 'Blue', accent: '#3b82f6', accent2: '#bfdbfe' },
    { id: 'rose', label: 'Rose', accent: '#e11d48', accent2: '#fecdd3' },
    { id: 'violet', label: 'Violet', accent: '#7c3aed', accent2: '#ddd6fe' }
  ];

  selectedTemplate = this.loadTemplate();
  selectedTheme = this.loadTheme();

  selectTemplate(templateId: string) {
    this.selectedTemplate = templateId;
    this.persist(TEMPLATE_KEY, templateId);
  }

  selectTheme(theme: ThemeColor) {
    this.selectedTheme = theme;
    this.persist(THEME_KEY, theme.id);
  }

  private loadTemplate() {
    const saved = this.read(TEMPLATE_KEY);
    const exists = this.templates.some((t) => t.id === saved);
    return exists ? (saved as string) : 'modern';
  }

  private loadTheme() {
    const saved = this.read(THEME_KEY);
    return this.themes.find((t) => t.id === saved) ?? this.themes[0];
  }

  private read(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private persist(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore storage errors
    }
  }
}
