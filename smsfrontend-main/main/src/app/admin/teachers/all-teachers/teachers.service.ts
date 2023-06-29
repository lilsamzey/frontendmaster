import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teachers } from './teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:3000/teachers';
  isTblLoading = true;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Teachers;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teachers[] {


    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  // getAllTeacherss(): void {
  //   this.subs.sink = this.httpClient.get<Teachers[]>(this.API_URL).subscribe({
  //     next: (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data);


  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + ' ' + error.message);
  //     },
  //   });
  // }

  getAllTeacherss(): Promise<Teachers[]> {
    return new Promise<Teachers[]>((resolve, reject) => {
      this.httpClient.get<Teachers[]>(this.API_URL)
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















  addTeachers(teachers: Teachers): void {
    this.dialogData = teachers;

    this.httpClient.post(this.API_URL, teachers)
      .subscribe({
        next: (data) => {
          this.dialogData = teachers;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateTeachers(id:number, teacher: Teachers): void {
    this.dialogData = teacher;

    this.httpClient.put(`${this.API_URL}/${id}`, teacher)
        .subscribe({
          next: (data) => {
            this.dialogData = teacher;
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteTeachers(id: number): void {
    console.log(id);

    this.httpClient.delete(`${this.API_URL}/ ${id}`)
        .subscribe({
          next: (data) => {
            console.log('Deleted:' +id);
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
}
