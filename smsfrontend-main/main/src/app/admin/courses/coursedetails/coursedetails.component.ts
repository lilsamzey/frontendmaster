import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from '../../students/all-students/students.service';
import { Students } from '../../students/all-students/students.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teachers } from 'app/admin/teachers/all-teachers/teachers.model';
import { TeachersService } from 'app/admin/teachers/all-teachers/teachers.service';

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
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'StudentNumber',
    'firstName',
    'add/remove',

  ];

  panelOpenState = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }




  breadscrums = [
    {
      title: 'About Course',
      items: ['Course'],
      active: 'About Course',
    },
  ];

  action: string;
  dialogTitle: string;
  course: Courses;
  allStudents: Students[] = [];
  allTeachers: Teachers[] = [];
  enrolledStudents: Students[] = [];
  enrolledTeachers: Teachers[] = [];

  dataSource!: MatTableDataSource<Students>;
  dataSource2!: MatTableDataSource<Students>;

  dataSource3!: MatTableDataSource<Teachers>;
  dataSource4!: MatTableDataSource<Teachers>;

  studentsNumberOfCourse=this.courseStudentsNumber



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    public dialogRef: MatDialogRef<CoursedetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.course.courseName;
      this.course = data.course;
    } else {
      this.dialogTitle = 'New Teachers';
      const blankObject = {} as Courses;
      this.course = new Courses(blankObject);
    }
  }

  async ngOnInit(): Promise<void> {

    this.dataSource = new MatTableDataSource<Students>(this.allStudents);
    this.dataSource3 = new MatTableDataSource<Teachers>(this.allTeachers);
    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    try {
      this.allStudents = await this.studentsService.getAllStudentss();
      this.allTeachers = await this.teachersService.getAllTeacherss();

  console.log('control1')
      // Kursa kayıtlı öğrencileri almak için yeni fonksiyonu çağır
      this.enrolledStudents = await this.coursesServiceService.getEnrolledStudents(this.course.CourseId);

      this.enrolledTeachers = await this.coursesServiceService.getAssignedTeachers(this.course.CourseId);
      console.log('Enrolled Students12 :', this.enrolledStudents);
    } catch (error) {
      console.error('Error 12:', error);
    }

    this.dataSource = new MatTableDataSource<Students>(this.allStudents);
    this.dataSource3 = new MatTableDataSource<Teachers>(this.allTeachers);
    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);
    this.dataSource4 = new MatTableDataSource<Teachers>(this.enrolledTeachers);


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.panelOpenState = false;
  }







  enrollStudent(courseId: number, studentId: number) {
    const alreadyEnrolled = this.enrolledStudents.find(student => student.StudentId === studentId);
    if (alreadyEnrolled) {
      console.log('Student already enrolled in the course');
      this.showTitleErorIcon(studentId)
    } else {
      this.coursesServiceService.enrollStudent(courseId, studentId)
        .subscribe(
          () => {
            // Kayıt işlemi başarılı olduğunda yapılacak işlemler
            console.log('Student enrolled successfully');
            // Gerekli işlemleri gerçekleştirin, öğrencinin kursa kaydedildiğini gösterin veya diğer işlemleri yapın.
            //this.enrolledSuccessfully(studentId)


          },
          (error: HttpErrorResponse) => {
            // Hata durumunda yapılacak işlemler
            console.error('Enrollment error:', error);
            // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
          }
        );
    }
    this.ngOnInit()
  }





  alreadyEnrolled(x: number) {
    Swal.fire(`Student already enrolled in the course, Student number: ${x}'`, 'Click OK to add new one');
  }

  showTitleErorIcon(x: number) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Student already enrolled in the course, Student number: ${x}`,
      //footer: '<a href>Why do I have this issue?</a>',
    });
  }





  enrolledSuccessfully(x: number) {
    Swal.fire(`Student enrolled successfully, Student number: ${x}'`, 'Click OK to add new one');
  }




  removeStudentFromCourse(courseId: number, studentId: number): void {
    this.coursesServiceService.removeStudent(courseId, studentId)
      .subscribe(
        () => {
          // Öğrenci başarıyla kaldırıldığında yapılacak işlemler
          this.snackBar.open('Student removed from course', 'Close', {
            duration: 2000
          });
          this.refreshEnrolledStudentList(studentId);
        },
        (error: HttpErrorResponse) => {
          // Hata durumunda yapılacak işlemler
          console.error('Removal error:', error);
          // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
        }
      );
  }


  refreshEnrolledStudentList(studentId: number): void {
    this.enrolledStudents = this.enrolledStudents.filter(student => student.StudentId !== studentId);
    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    this.courseStudentsNumber(this.dataSource2.data)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  courseStudentsNumber(_dataSource2:any[]): number {
    return this.dataSource2.data.length;
  }


//TEACHERS


  assignTeacher(courseId: number, teacherId: number) {
    const alreadyEnrolled = this.enrolledTeachers.find(teacher => teacher.TeacherId === teacherId);
    if (alreadyEnrolled) {
      console.log('Student already enrolled in the course');
      this.showTitleErorIcon(teacherId)
    } else {
      this.coursesServiceService.addAssignedTeacher(courseId, teacherId)
        .subscribe(
          () => {
            // Kayıt işlemi başarılı olduğunda yapılacak işlemler
            this.snackBar.open('Teacher added to course', 'Close', {
              duration: 2000
            });

            this.refreshAssineedTeacherList(teacherId);

          },
          (error: HttpErrorResponse) => {
            // Hata durumunda yapılacak işlemler
            console.error('Enrollment error:', error);
            // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
          }
        );
    }
    this.ngOnInit()

  }

  removeTeacherFromCourse(courseId: number, teacherId: number): void {
    this.coursesServiceService.removeTeacher(courseId, teacherId)
      .subscribe(
        () => {
          // Öğrenci başarıyla kaldırıldığında yapılacak işlemler
          this.snackBar.open('Student removed from course', 'Close', {
            duration: 2000
          });
          this.refreshAssineedTeacherList(teacherId);
        },
        (error: HttpErrorResponse) => {
          // Hata durumunda yapılacak işlemler
          console.error('Removal error:', error);
          // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
        }
      );
  }

  refreshAssineedTeacherList(teacherId: number): void {
    this.enrolledTeachers = this.enrolledTeachers.filter(teacher => teacher.TeacherId !== teacherId);
   // this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    //this.courseStudentsNumber(this.dataSource2.data)
  }



}
