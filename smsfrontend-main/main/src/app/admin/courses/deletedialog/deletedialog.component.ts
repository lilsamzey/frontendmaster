import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import { Location } from '@angular/common';


export interface DialogData {
  CourseId: number;
  courseName: string;

}

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})

export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private location: Location
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.coursesServiceService.deleteCourses(this.data.CourseId);
    window.location.reload();
  }
}
