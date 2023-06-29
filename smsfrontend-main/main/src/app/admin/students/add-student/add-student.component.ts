import { Component } from '@angular/core';
import { StudentsService } from '../all-students/students.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  stdForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Student',
      items: ['Student'],
      active: 'Add Student',
    },
  ];

  constructor(private fb: UntypedFormBuilder, private studentsService: StudentsService , public dialogRef: MatDialogRef<AddStudentComponent>,) {
    this.stdForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      rollNo: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      mobile: ['', [Validators.required]],
      rDate: ['', [Validators.required]],
      department: [''],
      parentName: ['', [Validators.required]],
      parentNo: [''],
      dob: ['', [Validators.required]],
      bGroup: [''],
      address: [''],
      uploadFile: [''],
    });
  }

  onSubmit() {

    if (this.stdForm.valid) {
    console.log('Form Value:', this.stdForm.value);
    // Add the following line to call the service method to add the student
    this.studentsService.addStudents(this.stdForm.value);

  }}
}
