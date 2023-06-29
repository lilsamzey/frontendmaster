/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import {CoursedetailsComponent} from '../coursedetails/coursedetails.component'




import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {Courses} from './ngx-datatable.model'
import {DeleteDialogComponent} from '../deletedialog/deletedialog.component'

import {EditdialogComponent} from '../editdialog/editdialog.component'



import {
  MatSnackBar,

} from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';

import {

  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { AdddialogComponent } from '../adddialog/adddialog.component';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})



export class CoursesListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{





  selection = new SelectionModel<Courses>(true, []);

  searchQuery = '';

  id?: number;

  data1!: Courses[];


  displayData: any[]=[];

  breadscrums = [
    {
      title: 'All Courses',
      items: ['Courses'],
      active: 'List',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exampleDatabase: any;
  teachersService: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public coursesServiceService: CoursesServiceService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    super();
  }



  showBasicMessage() {
    Swal.fire('Here is a message!');
  }






  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };



  ngOnInit() {




    this.coursesServiceService.getAllCourses().subscribe({
      next: (res: any)=> {
         this.data1=res;
        },

    error: (error) => console.log(error.message),

    complete: () => console.info('Api call completed')
      });



}





addNew(){
  let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AdddialogComponent, {
      data: {
        course: this.data1,
        action: 'add',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
           this.coursesServiceService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
}
  refreshTable() {
    throw new Error('Method not implemented.');
  }
  showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }

refresh(){
  console.log("addnewbutton")
}

removeSelectedRows(){
  console.log("addnewbutton")
}
exportExcel(){
  console.log("addnewbutton")
}


refreshPage(): void {
  window.location.reload();
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
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    }

  })}






editCall(course: Courses) {
  this.id = course.CourseId;
  console.log(course)

  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(EditdialogComponent, {
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
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    }

  })}









deleteItem(course: Courses) {

  this.id = course.CourseId;
  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: course,
    direction: tempDirection,
  });

  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
        (x: { CourseId: number | undefined; }) => x.CourseId === this.id
      );
      // for delete we use splice in order to remove single object from DataService
      if (foundIndex != null && this.exampleDatabase) {
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    }
  });
}








}
