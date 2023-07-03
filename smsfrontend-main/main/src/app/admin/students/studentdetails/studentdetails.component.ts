
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../all-students/students.service';
import { Students } from '../all-students/students.model';



export interface DialogData {
  student: Students;
  StudentId: number;
  name: string;
  department: string;
  mobile: string;
}


@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})




export class StudentdetailsComponent {

  breadscrums = [
    {
      title: 'Profile',
      items: ['Student'],
      active: 'Profile',
    },
  ];


  constructor(
    public dialogRef: MatDialogRef<StudentdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService
  ) {


  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  // ngOnInit():void{
  //   console.log(this.data.student.StudentId);

  // }


















}
