
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Courses } from './courses-list/ngx-datatable.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Students } from '../students/all-students/students.model';
import { Observable } from 'rxjs';
import { Teachers } from '../teachers/all-teachers/teachers.model';

@Injectable({
  providedIn: 'root'
})


export class CoursesServiceService extends UnsubscribeOnDestroyAdapter {
  [x: string]: any;
  private readonly API_URL = 'http://localhost:3000/courses';
  isTblLoading = true;
  dataChange: BehaviorSubject<Courses[]> = new BehaviorSubject<Courses[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Courses;
  lastData:any []=[]
  constructor(public httpClient: HttpClient) {
    super();
  }
  get data(): Courses[] {

    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCourses(){

    return this.httpClient.get(this.API_URL);

  }

  addCourses(course: Courses): void {
    this.dialogData = course;

    this.httpClient.post(this.API_URL, course)
      .subscribe({
        next: (data) => {
          this.dialogData = course;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateCourses(id:number, course: Courses): void {
    this.dialogData = course;

    this.httpClient.put(`${this.API_URL}/${id}`, course)
        .subscribe({
          next: (data) => {
            this.dialogData = course;
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteCourses(id: number): void {
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



  getEnrolledStudents(courseId: number): Promise<Students[]> {
    return this.httpClient.get<Students[]>(`${this.API_URL}/${courseId}/students`)
      .toPromise()
      .then(response => response || []);
  }



  enrollStudent(courseId: number, studentId: number): Observable<any> {
    const url = `${this.API_URL}/${courseId}/enroll`;

    console.log('courseserviceden' + courseId)
    const body = { studentId: studentId };

    return this.httpClient.post(url, body);
  }


  removeStudent(courseId: number, studentId: number): Observable<any> {


    return this.httpClient.delete(`${this.API_URL}/${courseId}/students/${studentId}`);
  }


  addAssignedTeacher(courseId: number, teacherId: number): Observable<any> {
    const url = `${this.API_URL}/${courseId}/assign`;

    console.log('courseserviceden' + courseId)
    const body = { teacherId: teacherId };

    return this.httpClient.post(url, body);
  }

  getAssignedTeachers(courseId: number): Promise<Teachers[]> {

    console.log('hallo' + courseId)
    return this.httpClient.get<Teachers[]>(`${this.API_URL}/${courseId}/teachers`)
      .toPromise()
      .then(response => response || []);
  }

  removeTeacher(courseId: number, teacherId: number): Observable<unknown> {


    return this.httpClient.delete(`${this.API_URL}/${courseId}/teachers/${teacherId}`);
  }


}
