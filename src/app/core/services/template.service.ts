import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';

export interface ResumeTemplate {
  id: string;
  template:string;
  label: string;
  style: 'classic' | 'modern' | 'minimal';
}

export interface ThemeColor {
  id: string;
  theme:string;
  label: string;
  accent: string;
  accent2: string;
}

const TEMPLATE_KEY = 'resume.template';
const THEME_KEY = 'resume.theme';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  
constructor(private http: HttpClient) {}
 
private readonly baseUrl = 'http://localhost:3000/api/resume';

loadTemplates(){
  return this.http.get(`${this.baseUrl}/templates`).pipe(
    tap((res:any) => console.log('Fetched templates:', res.data)),
    map((t: any) => t.data.map((item: any) => {
      const rawTemplate = item.template ?? item.Template ?? '';
      const rawStyle = item.style ?? item.Style ?? '';
      return {
        id: item.id ?? item.Id,
        template: String(rawTemplate).toLowerCase(),
        label: item.label ?? item.Label ?? rawTemplate,
        style: String(rawStyle).toLowerCase() as ResumeTemplate['style']
      };
    }) as ResumeTemplate[]));
  
}  
loadThemes(){
  return this.http.get(`${this.baseUrl}/themes`).pipe(
    tap((res:any) => console.log('Fetched themes:', res.data)),
    map((t: any) => t.data.map((item: any) => {
      const rawTheme = item.theme ?? item.Theme ?? '';
      return {
        id: item.id ?? item.Id,
        theme: String(rawTheme).toLowerCase(),
        label: item.label ?? item.Label ?? rawTheme,
        accent: item.accent ?? item.Accent,
        accent2: item.accent2 ?? item.Accent2
      };
    }) as ThemeColor[]));
}

  // selectedTemplate = this.loadTemplate();
  // selectedTheme = this.loadTheme();

  // selectTemplate(templateId: string) {
  //   this.selectedTemplate = templateId;
  //   this.persist(TEMPLATE_KEY, templateId);
  // }

  // selectTheme(theme: ThemeColor) {
  //   this.selectedTheme = theme;
  //   this.persist(THEME_KEY, theme.id);
  // }

  // private loadTemplate() {
  //   const saved = this.read(TEMPLATE_KEY);
  //   const exists = this.templates.some((t) => t.id === saved);
  //   return exists ? (saved as string) : 'modern';
  // }

  // private loadTheme() {
  //   const saved = this.read(THEME_KEY);
  //   return this.themes.find((t) => t.id === saved) ?? this.themes[0];
  // }

  
}
