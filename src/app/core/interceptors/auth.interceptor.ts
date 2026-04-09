import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const cloneReq = req.clone({
  withCredentials: true
 });
  return next(cloneReq);
};
