import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:3000/students';
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Students;
  allStudents:any[]=[]

  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Students[] {
    return this.dataChange.value;
  }
  getDialogData() {

    return this.dialogData;
  }
  /** CRUD METHODS */


  getAllStudentss(): Promise<Students[]> {
    return new Promise<Students[]>((resolve, reject) => {
      this.httpClient.get<Students[]>(this.API_URL)
        .subscribe({
          next: (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data);
            resolve(data);
          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          }
        });
    });
  }






  addStudents(student: Students): void {
    this.dialogData = student;

    this.httpClient.post(this.API_URL, student)
      .subscribe({
        next: (data) => {
          this.dialogData = student;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
        },
      });
  }
  updateStudents(id:number, students: Students): void {
    this.dialogData = students;

    this.httpClient.put(`${this.API_URL}/ ${id}`, students)
        .subscribe({
          next: (data) => {
            this.dialogData = students;
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteStudents(id: number): void {
    console.log(id);

    this.httpClient.delete(`${this.API_URL}/${id}`)
        .subscribe({
          next: (data) => {
            console.log(id);
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
}

