import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { CoursesServiceService } from './courses-service.service';
import { FilterPipe } from '../courses/courses-list/filter.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdddialogComponent } from './adddialog/adddialog.component';
import { DeleteDialogComponent } from './deletedialog/deletedialog.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { StudentsService } from '../students/all-students/students.service';
import { TeachersService } from '../teachers/all-teachers/teachers.service';

@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    AboutCourseComponent,
    AllCourseComponent,
    CoursesListComponent,
    FilterPipe,
    AdddialogComponent,
    DeleteDialogComponent,
    EditdialogComponent,
    CoursedetailsComponent


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    ComponentsModule,
    SharedModule,
    NgxDatatableModule,
    HttpClientModule,
    MatPaginatorModule,

  ],

  providers: [CoursesServiceService, StudentsService, TeachersService],


})
export class CoursesModule {}


