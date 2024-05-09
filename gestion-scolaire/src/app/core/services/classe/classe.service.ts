import { Injectable } from '@angular/core';
import { Classe } from '../../utils/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) { }

  getAllClasse(): Promise<Classe[]>{
    return new Promise((resolve, reject) => {
      this.http.get<Classe[]>(`${environment.apiUrl}/classes`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  addClasse(data: Classe): Promise<Classe>{
    return new Promise<Classe>((resolve, reject) => {
      this.http.post<Classe>(`${environment.apiUrl}/classes`, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  getClasseById(id: string): Promise<Classe>{
    return new Promise((resolve, reject) => {
      this.http.get<Classe>(`${environment.apiUrl}/classes/${id}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  updateClasse(id: string, data: Classe): Promise<Classe>{
    return new Promise<Classe>((resolve, reject) => {
      this.http.patch<Classe>(`${environment.apiUrl}/classes/${id}`, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  deleteClasse(id: string): Promise<Classe>{
    return new Promise<Classe>((resolve, reject) => {
      this.http.delete<Classe>(`${environment.apiUrl}/classes/${id}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }
}
