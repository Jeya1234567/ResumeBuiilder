import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { TokenService } from './token.service';

export interface PersonalPayload {
  id?: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  summary: string;
  templateId: string;
}
export interface EducationPayload {
  school: string;
  degree: string;
  field: string;
  start: number;
  end: number;
  grade: string;
}

export interface TechnicalPayload {
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end: string;
  highlights: string;
}

export interface ProjectItem {
  name: string;
  role: string;
  description: string;
  tech: string;
}

export interface PersonalDetailsResponse {
  resume_id: number;
}

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly baseUrl = 'http://localhost:3000/api/resume';

  constructor(private http: HttpClient, private tokenService: TokenService) {}
 
  savePersonal(payload: PersonalPayload) {
    return this.http.post<PersonalDetailsResponse>(`${this.baseUrl}/savepersonaldetails`, payload).pipe(
      tap((res) => 
        {
          if(payload.id === 0 || payload.id === undefined){
          this.tokenService.setResumeId(res.resume_id.toString());
           }
        }
      ) 
      );
  }

  saveEducation(items: EducationPayload[], resumeId: string) {
    console.log('Saving education details for resume ID:', resumeId, 'with items:', items);
    return this.http.post(`${this.baseUrl}/saveeducationdetails/${resumeId}`, { items });
  }

  saveTechnical(payload: TechnicalPayload,resumeId: string) {
    return this.http.post(`${this.baseUrl}/savetechnical/${resumeId}`, { payload });
  }

  saveExperience(items: ExperienceItem[], resumeId: string) {
    console.log('Saving experience details for resume ID:', resumeId, 'with items:', items);
    return this.http.post(`${this.baseUrl}/saveexperiencedetails/${resumeId}`, { items });
  }

  saveProjects(items: ProjectItem[], resumeId: string) {
    return this.http.post(`${this.baseUrl}/saveprojects/${resumeId}`, { items });
  }

  getResume() {
    return this.http.get(`${this.baseUrl}/me`);
  }
}
