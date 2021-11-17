import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HashService } from '../services/hash.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Student } from '../models/student';

@Component({
  selector: 'app-student-rozklad',
  templateUrl: './student-rozklad.component.html',
  styleUrls: ['./student-rozklad.component.scss'],
})
export class StudentRozkladComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private hashService: HashService
  ) {}

  student: Student | any = {};
  rozklad: any;

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.student.fakultet = this.hashService.decrypt(params.fakultet);
          this.student.kafedra = this.hashService.decrypt(params.kafedra);
          this.student.kurs = this.hashService.getKursByGrupa(params.grupa);
          this.student.grupa = params.grupa;
          return this.dataService.getStudentRozklad(this.student);
        })
      )
      .subscribe((data) => {
        this.rozklad = Object.values(data);
      });
  }

  goBack() {
    this.router.navigateByUrl(this.router.createUrlTree(['student']), {});
  }
}
