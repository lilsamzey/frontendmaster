import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';


import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Students } from '../../students.model';



export interface DialogData {
  StudentId: number;
  action: string;
  students: Students;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Students;
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.firstName;
      this.students = data.students;
    } else {
      this.dialogTitle = 'New Students';
      const blankObject = {} as Students;
      this.students = new Students(blankObject);
    }
    this.stdForm = this.createEditForm();
  }


  breadscrums = [
    {
      title: 'Edit Student',
      items: ['Student'],
      active: 'Edit Student',
    },
  ];




  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createEditForm(): UntypedFormGroup {
    return this.fb.group({
      first: [
        this.students.firstName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [this.students.lastName],
      rollNo: [this.students.rollNo],
      gender: [this.students.gender, [Validators.required]],
      mobile: [this.students.mobile, [Validators.required]],
      rDate: [this.students.rDate, [Validators.required]],
      email: [
        this.students.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      department: [this.students.department],
      parentName: [this.students.parentName, [Validators.required]],
      parentNo: [this.students.parentNo],
      dob: [this.students.dob, [Validators.required]],
      bGroup: [this.students.bGroup],
      address: [this.students.address],
      uploadFile: [this.students.uploadFile],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {

    //this.studentsService.updateStudents(this.stdForm.getRawValue());
  }
  onSubmit() {
    console.log('Form Value first name', this.stdForm.value.first);

    console.log('Form Value:', this.students.StudentId);
    // Add the following line to call the service method to add the student
   this.studentsService.updateStudents(this.students.StudentId, this.stdForm.value);

   this.dialogRef.close();


  }

}

