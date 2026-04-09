import { Component,ViewChild,ElementRef,ChangeDetectorRef,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService, ExperienceItem, ProjectItem } from '../../core/services/resume.service';
import { TemplateService, ThemeColor } from '../../core/services/template.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TokenService } from '../../core/services/token.service';


@Component({
  selector: 'app-resume-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './resume-wizard.component.html',
  styleUrl: './resume-wizard.component.scss'
})
export class ResumeWizardComponent {
  isSaving = false;
  saveError = '';
  skills: string[] = ['Angular', '.NET', 'SQL'];
  profileImage: string | null = null;
  templatesWithPhoto = new Set<string>(['modern', 'creative', 'bold-sidebar', 'split-header', 'modern-photo-left']);
  defaultProfileImage = 'images/profile-default.jpg';
  personalForm: any;
  educationForm: any;
  experienceForm: any;
  projectsForm: any;
  technicalForm: any;
  currentSection: 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'done' = 'personal';
  @ViewChild('pdfcontent') pdfcontent!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private auth: AuthService,
    private router: Router,
    public templateService: TemplateService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService
  ) {
    this.personalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      title: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,15}$/)]],
      location: ['', [Validators.required]],
      linkedIn: [''],
      summary: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.educationForm = this.fb.group({
      items: this.fb.array([this.createEducation()])
    });

    this.experienceForm = this.fb.group({
      items: this.fb.array([this.createExperience()])
    });

    this.projectsForm = this.fb.group({
      items: this.fb.array([this.createProject()])
    });

    this.technicalForm = this.fb.group({
      skillInput: ['']
    });
  }

  showPhotoForSelectedTemplate() {
    return this.templatesWithPhoto.has(this.templateService.selectedTemplate);
  }

  onProfileImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    this.ngZone.run(() => {
      reader.onload = () => {
        this.profileImage = reader.result as string;
          this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    });
  }

  clearProfileImage() {
    this.profileImage = null;
  }

  get name() {
    return this.personalForm.value.name || 'Aarav Mehta';
  }

  get title() {
    return this.personalForm.value.title || 'Product Designer';
  }

  get educationLine() {
    const first = (this.educationItems?.value ?? [])[0] ?? {};
    const school = first.school || 'NIT Surathkal';
    const degree = first.degree || 'B.Tech';
    const field = first.field || 'Computer Science';
    return `${degree} - ${field} - ${school}`;
  }

  get educationYear() {
    const first = (this.educationItems?.value ?? [])[0] ?? {};
    return first.year || 2022;
  }

  get experienceItems() {
    return this.experienceForm.get('items') as FormArray;
  }

  get projectItems() {
    return this.projectsForm.get('items') as FormArray;
  }

  get educationItems(){
    return this.educationForm.get('items') as FormArray;
  }
  
  setSection(section: 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'done') {
    this.currentSection = section;
  }
  addEducation() {
    this.educationItems.push(this.createEducation());
    console.log(this.educationItems.value);
  }

  removeEducation(index: number) {
    if (this.educationItems.length > 1) {
      this.educationItems.removeAt(index);
    }
  }

  selectTemplate(template: string) {
    this.templateService.selectTemplate(template);
  }

  selectTheme(theme: ThemeColor) {
    this.templateService.selectTheme(theme);
  }

  createExperience() {
    return this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      start: ['', Validators.required],
      end: [''],
      highlights: ['']
    });
  }
  createEducation() {
    return this.fb.group({
       school: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      field: [''],
      start: [2021, [Validators.required, Validators.min(1950), Validators.max(2100)]],
      end: [2025, [Validators.required, Validators.min(1950), Validators.max(2100)]],
      grade: ['', [Validators.required]]
  });
  }

  addExperience() {
    this.experienceItems.push(this.createExperience());
  }

  removeExperience(index: number) {
    if (this.experienceItems.length > 1) {
      this.experienceItems.removeAt(index);
    }
  }

  createProject() {
    return this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      description: [''],
      tech: ['']
    });
  }

  addProject() {
    this.projectItems.push(this.createProject());
  }

  removeProject(index: number) {
    if (this.projectItems.length > 1) {
      this.projectItems.removeAt(index);
    }
  }

  addSkill() {
    const value = (this.technicalForm.value.skillInput || '').trim();
    if (!value) return;
    const items = value.split(',').map((s: string) => s.trim()).filter(Boolean);
    items.forEach((item: string) => {
      if (!this.skills.includes(item)) this.skills.push(item);
    });
    this.technicalForm.patchValue({ skillInput: '' });
  }

  removeSkill(skill: string) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  savePersonal() {
    if (this.personalForm.invalid) {
      console.log('Personal form is invalid:', this.personalForm.errors);
      this.personalForm.markAllAsTouched();
      return;
    }
    const templateId = this.templateService.selectedTemplate;
    this.saveError = '';
    this.isSaving = true;
    const id= this.tokenService.getResumeId() ? Number(this.tokenService.getResumeId()) : 0;
    console.log('id from token service:', id);
    console.log('Saving personal details with template ID:', templateId);
    this.resumeService.savePersonal({...this.personalForm.value, templateId,id} ).subscribe({
      next: () => {
        this.isSaving = false;
        this.setSection('education');
        this.cdr.markForCheck();
        console.log('Personal details saved successfully');
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Failed to save personal details';
      }
    });
  }

  saveEducation() {
    if (this.educationForm.invalid) {
      this.educationForm.markAllAsTouched();
      return;
    }
    this.saveError = '';
    this.isSaving = true;
    const resumeId = this.tokenService.getResumeId() ?? '';
    this.resumeService.saveEducation(this.educationForm.value.items as any, resumeId).subscribe({
      next: () => {
        this.isSaving = false;
        this.setSection('experience');
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Failed to save education details';
      }
    });
  }

  saveExperience() {
    if (this.experienceForm.invalid) {
      this.experienceForm.markAllAsTouched();
      return;
    }
    const items = this.experienceItems.value as ExperienceItem[];
    this.saveError = '';
    this.isSaving = true;
    const resumeId = this.tokenService.getResumeId() ?? '';
    this.resumeService.saveExperience(items, resumeId).subscribe({
      next: () => {
        this.isSaving = false;
        this.setSection('projects');
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Failed to save experience';
      }
    });
  }

  saveProjects() {
    if (this.projectsForm.invalid) {
      this.projectsForm.markAllAsTouched();
      return;
    }
    const items = this.projectItems.value as ProjectItem[];
    this.saveError = '';
    this.isSaving = true;
    const resumeId = this.tokenService.getResumeId() ?? '';
    this.resumeService.saveProjects(items, resumeId).subscribe({
      next: () => {
        this.isSaving = false;
        this.setSection('skills');
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Failed to save projects';
      }
    });
  }

  saveTechnical() {
    if (!this.skills.length) {
      this.saveError = 'Add at least one skill.';
      return;
    }
    this.saveError = '';
    this.isSaving = true;
    const resumeId = this.tokenService.getResumeId() ?? '';
    this.resumeService.saveTechnical({ skills: this.skills }, resumeId).subscribe({
      next: () => {
        this.isSaving = false;
        this.setSection('done');
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err?.error?.message ?? 'Failed to save skills';
      }
    });
  }

  downloadPDF() {
    const element = this.pdfcontent.nativeElement;
    html2canvas(element).then((canvas) => { 
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgwidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgwidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

       pdf.addImage(imgData, 'PNG', 0, position, imgwidth, imgHeight);
       heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgwidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('resume.pdf');
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
       alert('Logout failed: ' + (err?.error?.message ?? 'Unknown error'));
      }
    });
  }

}

