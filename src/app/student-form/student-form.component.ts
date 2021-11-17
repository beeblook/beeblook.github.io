import { Component, OnInit } from '@angular/core';
import { Fakultet } from '../models/fakultet';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  fakultety!: [Fakultet];
  answers: any = {};

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getStudentOptions().subscribe((data) => {
      this.fakultety = data;
    });
  }

  onFakultetSelect(fakultet: any): void {
    this.answers.fakultet = fakultet;
  }
  onKafedraSelect(kafedra: any): void {
    this.answers.kafedra = kafedra;
  }
  onKursSelect(kurs: any): void {
    this.answers.kurs = kurs;
    if (this.answers.kurs?.grupy?.length < 2) {
      this.onGrupaSelect(this.answers.kurs.grupy[0]);
    }
  }
  onGrupaSelect(grupa: any): void {
    this.answers.grupa = grupa;
    this.router.navigateByUrl(
      this.router.createUrlTree([
        'student',
        this.answers.fakultet.link,
        this.answers.kafedra.link,
        this.answers.grupa.name,
      ]),
      {
        // relativeTo: this.route,
        // skipLocationChange: false,
      }
    );
  }

  goBackToMain() {}
  goBackToFakultety() {
    this.answers.fakultet = '';
  }
  goBackToKafedry() {
    this.answers.kafedra = '';
  }
  goBackToKursy() {
    this.answers.kurs = NaN;
    this.answers.grupa = NaN;
  }
  goBackToGrupy() {
    this.answers.grupa = NaN;
    if (this.answers.kurs?.grupy?.length < 2) {
      this.goBackToKursy();
    }
  }
}
