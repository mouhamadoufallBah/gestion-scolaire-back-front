import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  
  constructor(private http: HttpClient) { }

  getAll(path: string): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(environment.api +path).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  add(path: string, data: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(environment.api + path, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  getById(path: string, id: any): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.api}${path}/${id}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  getStudentNoteByIdEvaluation(path: string, id: any, data: any): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.api}${path}/${id}`, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  update(path: string, id: string, data: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.put<any>(`${environment.api}${path}/${id}`, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  delete(path: string, id: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(`${environment.api}${path}/${id}`).subscribe({
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
