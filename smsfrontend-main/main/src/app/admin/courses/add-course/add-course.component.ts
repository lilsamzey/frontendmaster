import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AdddialogComponent } from '../adddialog/adddialog.component';

import {CoursesServiceService} from '../courses-service.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  courseForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Course',
      items: ['Course'],
      active: 'Add Course',
    },
  ];
  constructor(private fb: UntypedFormBuilder,
    private coursesServiceService:CoursesServiceService,
    private snackBar: MatSnackBar) {

    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      courseCode: [''],
      courseDetails: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      length: ['', [Validators.required]],
      price: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      studentsNumber: [''],
      contactNumber: ['', [Validators.required]],
      uploadFile: [''],
    });
  }
  onSubmit() {

    if (this.courseForm.valid) {
      console.log('Add Course Form Value:', this.courseForm.value);
      this.coursesServiceService.addCourses(this.courseForm.value);
      this.showAlert('Your new Course: ' + this.courseForm.value.courseName + ' added.');
      this.showWithTitleMessage()

    }



  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds (3 seconds in this example)
      verticalPosition: 'top' // Position the alert at the top of the screen
    });
  }



  showWithTitleMessage() {
    Swal.fire('You added new Course', 'Click OK to add new one');
  }

}
