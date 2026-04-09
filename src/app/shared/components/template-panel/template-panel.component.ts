import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplate, ThemeColor } from '../../../core/services/template.service';

@Component({
  selector: 'app-template-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-panel.component.html',
  styleUrl: './template-panel.component.scss'
})
export class TemplatePanelComponent {
  @Input() title = 'Choose Template';
  @Input() templates: ResumeTemplate[] = [];
  @Input() themes: ThemeColor[] = [];
  @Input() selectedTemplate = '';
  @Input() selectedTheme: ThemeColor | null = null;

  @Output() templateSelect = new EventEmitter<string>();
  @Output() themeSelect = new EventEmitter<ThemeColor>();
}
