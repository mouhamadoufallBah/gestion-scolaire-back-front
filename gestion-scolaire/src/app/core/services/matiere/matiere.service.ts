import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../../utils/interfaces';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }


  getAllSubject(): Promise<Subject[]> {
    return new Promise<Subject[]>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/matieres`).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      }

      )
    })
  }

  getSubjectById(id: string): Promise<Subject> {
    return new Promise<Subject>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/matieres/${id}`).subscribe({
        next: (res: any) => {
          resolve(res)
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  addSubject(data: any): Promise<Subject> {
    return new Promise<Subject>((resolve, reject) =>{
      this.http.post(`${environment.apiUrl}/matieres`, data).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err) =>{
          reject(err);
        }
      });
    })
   }

  updateSubject(id: string, data: any): Promise<Subject> {
    return new Promise(((resolve, reject) =>{
      this.http.patch(`${environment.apiUrl}/matieres/${id}`, data).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    }))
  }

  deleteSubject(id: string): Promise<Subject> {
    return new Promise(((resolve, reject) =>{
      this.http.delete<Subject>(`${environment.apiUrl}/matieres/${id}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    }))
  }
}
