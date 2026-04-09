import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly key = 'rb_token';
  private readonly RKey = 'rb_resumeId';

  setToken(token: string) {
    sessionStorage.setItem(this.key, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.key);
  }

  setResumeId(resumeId: string) {
    sessionStorage.setItem(this.RKey, resumeId);
  }

  getResumeId(): string | null {
    return sessionStorage.getItem(this.RKey);
  }

  clear() {
    sessionStorage.clear();
  }
 
}
