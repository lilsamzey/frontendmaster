
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {CoursesServiceService  } from '../courses-service.service';

import {Courses} from '../courses-list/ngx-datatable.model'

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';





export interface DialogData {
  CourseId: number;
  action: string;
  course: Courses;
}

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})


export class EditdialogComponent {

  action: string;
  dialogTitle: string;
  courseForm: UntypedFormGroup;
  course: Courses;

  constructor(
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.course.courseName;
      this.course = data.course;
    } else {
      this.dialogTitle = 'New Teachers';
      const blankObject = {} as Courses;
      this.course = new Courses(blankObject);
    }
    this.courseForm = this.createEditForm();
  }



  formdata = {
    cName: 'PHP Development',
    cCode: 'IR43234',
    cDetails: 'Basic php course from beginning.',
    sDate: '2020-02-17T14:22:18Z',
    cTyme: '10:30',
    cPrice: '12.4$',
    pName: '2',
    maxStds: '130',
    contactNo: '1234567890',
    uploadFile: '',
  };
  breadscrums = [
    {
      title: 'Edit Course',
      items: ['Course'],
      active: 'Edit Course',
    },
  ];


  onSubmit() {
    console.log('Form Value', this.courseForm.value);

    this.coursesServiceService.updateCourses(this.course.CourseId, this.courseForm.value);

    this.dialogRef.close();




  }


  createEditForm(): UntypedFormGroup {
    return this.courseForm = this.fb.group({
      courseName: [this.course.courseName, [Validators.required]],
      courseCode: [this.course.courseCode],
      courseDetails: [this.course.courseDetails, [Validators.required]],
      startDate: [this.course.startDate, [Validators.required]],
      length: [this.course.length, [Validators.required]],
      price: [this.course.price, [Validators.required]],
      teacher: [this.course.teacher, [Validators.required]],
      studentsNumber: [this.course.studentsNumber],
      contactNumber: [this.course.contactNumber, [Validators.required]],
      uploadFile: [''],
    });
  }
}

