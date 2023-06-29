


import { Direction } from '@angular/cdk/bidi';


import { Component, OnInit} from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';


import { Students } from '../../students/all-students/students.model';



import { CoursedetailsComponent } from '../coursedetails/coursedetails.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';

export interface DialogData {
  CourseId: number;
  action: string;
  course: Courses;
  firstName: string;
  lastName: string;
  gender: string;
}

export class Courses {
  CourseId!: number;
  courseName!: string;
  length: string | undefined;
  price: number | undefined;
  teacher: string | undefined;
  startDate: Date | undefined;
  enrolledStudents: Students[] | undefined;

  constructor(init?: Partial<Courses>) {
    Object.assign(this, init);
  }
}

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})
export class AllCourseComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  [x: string]: any;


items:any[] =[]
exampleDatabase: any;
teachersService: any;
id?: number;

  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];
  constructor(public coursesServiceService:CoursesServiceService,
    public dialog: MatDialog,
    ) {
    super();
  }


  ngOnInit(){



    this.coursesServiceService.getAllCourses().subscribe({
      next: (res: any)=> {
         this.items=res;
         console.log(this.items)
        },

    error: (error) => console.log(error.message),

    complete: () => console.info('Api call completed')
      });

  }





  details(course: Courses) {

    console.log('detaydan gelen' + course.CourseId)

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(CoursedetailsComponent, {
      data: {
        course: course,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x: { id: number | undefined; }) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.teachersService.getDialogData();
          // And lastly refresh table
          // this.refreshTable();
          // this.showNotification(
          //   'black',
          //   'Edit Record Successfully...!!!',
          //   'bottom',
          //   'center'
          // );
        }
      }

    })}













  }
