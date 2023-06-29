import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { StudentsModule } from "../students/students.module";




@NgModule({
    declarations: [MainComponent, Dashboard2Component],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        NgScrollbarModule,
        NgApexchartsModule,
        ComponentsModule,
        SharedModule,
        StudentsModule,

    ]
})
export class DashboardModule {}
