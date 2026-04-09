import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TemplateService } from '../../core/services/template.service';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  styleSections = [
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' }
  ];
  selectedStyle: 'classic' | 'modern' | 'minimal' | 'all' = 'classic';
  selectedSubgroup: string | null = null;
  templatesWithPhoto = new Set<string>([
    'modern',
    'creative',
    'bold-sidebar',
    'split-header',
    'modern-photo-left'
  ]);
  defaultProfileImage = 'images/profile-default.jpg';

  templateAccents: Record<string, { accent: string; accent2: string }> = {
    professional: { accent: '#1f4b75', accent2: '#94b4d6' },
    timeline: { accent: '#3d6f5c', accent2: '#b7d9c7' },
    'split-header': { accent: '#7b4b3a', accent2: '#e2c4b3' },
    'compact-ats': { accent: '#3c3c3c', accent2: '#d2d2d2' },
    'classic-serif': { accent: '#3f2b2b', accent2: '#d7c5b8' },
    modern: { accent: '#e68a2e', accent2: '#f7d0a7' },
    'project-first': { accent: '#4c2e7e', accent2: '#d2c4f4' },
    creative: { accent: '#b84a6a', accent2: '#f2c3d1' },
    'bold-sidebar': { accent: '#006d77', accent2: '#83c5be' },
    'modern-accent-bar': { accent: '#1d4ed8', accent2: '#bfdbfe' },
    'modern-photo-left': { accent: '#0f766e', accent2: '#99e0d6' },
    minimal: { accent: '#2f4b6e', accent2: '#c7d8f0' },
    'clean-lines': { accent: '#0f766e', accent2: '#99e0d6' },
    mono: { accent: '#1f2937', accent2: '#cbd5e1' },
    air: { accent: '#2563eb', accent2: '#bfdbfe' },
    'minimal-grid': { accent: '#0b5563', accent2: '#b9e0e5' }
  };

  templateBadges: Record<string, string[]> = {
    professional: ['ATS', 'Clean'],
    timeline: ['Timeline', 'Story'],
    'split-header': ['Header', 'Wide'],
    'compact-ats': ['ATS', 'Compact'],
    'classic-serif': ['Serif', 'Formal'],
    modern: ['Modern', 'Photo'],
    'project-first': ['Projects', 'Tech'],
    creative: ['Creative', 'Accent'],
    'bold-sidebar': ['Sidebar', 'Bold'],
    'modern-accent-bar': ['Accent', 'Minimal'],
    'modern-photo-left': ['Photo', 'Split'],
    minimal: ['Minimal', 'Clean'],
    'clean-lines': ['Lines', 'Light'],
    mono: ['Mono', 'ATS'],
    air: ['Airy', 'Open'],
    'minimal-grid': ['Grid', 'Simple']
  };

  templateSubgroups: Record<string, string[]> = {
    professional: ['professional', 'ats'],
    timeline: ['timeline'],
    'split-header': ['header'],
    'compact-ats': ['compact', 'ats'],
    'classic-serif': ['serif'],
    modern: ['photo', 'accent'],
    'project-first': ['projects'],
    creative: ['accent', 'photo'],
    'bold-sidebar': ['sidebar'],
    'modern-accent-bar': ['accent'],
    'modern-photo-left': ['photo'],
    minimal: ['clean'],
    'clean-lines': ['lines'],
    mono: ['mono', 'ats'],
    air: ['air'],
    'minimal-grid': ['grid']
  };

  subgroupsByStyle: Record<'classic' | 'modern' | 'minimal', { id: string; label: string }[]> = {
    classic: [
      { id: 'professional', label: 'Professional' },
      { id: 'ats', label: 'ATS' },
      { id: 'serif', label: 'Serif' },
      { id: 'compact', label: 'Compact' }
    ],
    modern: [
      { id: 'photo', label: 'Photo' },
      { id: 'accent', label: 'Accent' },
      { id: 'sidebar', label: 'Sidebar' },
      { id: 'projects', label: 'Projects' }
    ],
    minimal: [
      { id: 'clean', label: 'Clean' },
      { id: 'lines', label: 'Lines' },
      { id: 'mono', label: 'Mono' },
      { id: 'grid', label: 'Grid' },
      { id: 'air', label: 'Air' }
    ]
  };
  sample = {
    fullName: 'Aarav Mehta',
    title: 'Product Designer',
    email: 'you@email.com',
    phone: '+91 00000 00000',
    location: 'Bengaluru, IN',
    linkedIn: 'linkedin.com/in/you',
    summary:
      'Product designer with 6+ years crafting data-driven experiences across mobile and web. Led design systems, usability research, and accessible UI for scale.',
    experience: [
      {
        role: 'Senior Product Designer',
        company: 'BrightLabs',
        dates: '2022 - Present',
        highlights: 'Led redesign of analytics platform, improving activation by 28%.'
      },
      {
        role: 'Product Designer',
        company: 'Studio North',
        dates: '2019 - 2022',
        highlights: 'Built modular design system used across 5 product teams.'
      }
    ],
    projects: [
      {
        name: 'Insight Dashboard',
        role: 'Lead Designer',
        description: 'Designed metrics exploration and reporting UX for SMBs.',
        tech: 'Figma, React'
      },
      {
        name: 'Mobile Onboarding',
        role: 'UX Lead',
        description: 'Streamlined signup flow reducing drop-off by 22%.',
        tech: 'Figma, Protopie'
      }
    ],
    skills: ['Product Strategy', 'UX Research', 'Design Systems', 'Figma', 'Prototyping'],
    education: 'B.Tech - Computer Science - NIT Surathkal',
    educationYear: '2021-2025',
    educationGrade: 'CGPA: 86%'
  };

  constructor(public templateService: TemplateService, private router: Router) {}

  get filteredStyles() {
    if (this.selectedStyle === 'all') return this.styleSections;
    return this.styleSections.filter((s) => s.id === this.selectedStyle);
  }

  getTemplatesByStyle(style: string) {
    if (style !== 'classic' && style !== 'modern' && style !== 'minimal') {
      return [];
    }
    const byStyle = this.templateService.templates.filter((t) => t.style === style);
    if (!this.selectedSubgroup) return byStyle;
    return byStyle.filter((t) => (this.templateSubgroups[t.id] ?? []).includes(this.selectedSubgroup as string));
  }

  getFilteredCount() {
    if (this.selectedStyle === 'all') {
      const allTemplates = this.templateService.templates;
      if (!this.selectedSubgroup) return allTemplates.length;
      return allTemplates.filter((t) => (this.templateSubgroups[t.id] ?? []).includes(this.selectedSubgroup as string)).length;
    }
    return this.getTemplatesByStyle(this.selectedStyle).length;
  }

  selectStyle(style: 'classic' | 'modern' | 'minimal') {
    this.selectedStyle = style;
    this.selectedSubgroup = null;
  }

  clearStyleFilter() {
    this.selectedStyle = 'all';
    this.selectedSubgroup = null;
  }

  getSubgroupsForSelectedStyle() {
    if (this.selectedStyle === 'all') return [];
    return this.subgroupsByStyle[this.selectedStyle];
  }

  selectSubgroup(id: string) {
    this.selectedSubgroup = id;
  }

  clearSubgroup() {
    this.selectedSubgroup = null;
  }

  // Gallery uses a shared default image from assets.

  getAccent(templateId: string) {
    return this.templateAccents[templateId]?.accent ?? this.templateService.selectedTheme.accent;
  }

  getAccent2(templateId: string) {
    return this.templateAccents[templateId]?.accent2 ?? this.templateService.selectedTheme.accent2;
  }

  getBadges(templateId: string) {
    return this.templateBadges[templateId] ?? [];
  }

  showPhoto(templateId: string) {
    return this.templatesWithPhoto.has(templateId);
  }

  onTemplateSelect(templateId: string) {
    this.templateService.selectTemplate(templateId);
    this.router.navigateByUrl('/resume');
  }

  continueToBuilder() {
    this.router.navigateByUrl('/resume');
  }
}
