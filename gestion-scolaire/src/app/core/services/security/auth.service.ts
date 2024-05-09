import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false); //var super globale initialisé à false permet de savoir si user est auth ou pas


  constructor(private http: HttpClient) { }

  public login(data: any): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      this.http.post(`${environment.api}/user/login`, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    });
  }

}
