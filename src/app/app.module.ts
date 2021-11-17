import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';

import { DataService } from './services/data.service';
import { StudentRozkladComponent } from './student-rozklad/student-rozklad.component';
import { StudentFormComponent } from './student-form/student-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LessonHoursPipe } from './shared/lesson-hours.pipe';

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatRippleModule } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AppComponent, StudentRozkladComponent, StudentFormComponent, LessonHoursPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),

    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    // MatRippleModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatTooltipModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
