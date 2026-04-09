import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { ResumeWizardComponent } from './features/resume/resume-wizard.component';
import { TemplatesComponent } from './features/templates/templates.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard] },
  { path: 'resume', component: ResumeWizardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
