import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRozkladComponent } from './student-rozklad.component';

describe('StudentRozkladComponent', () => {
  let component: StudentRozkladComponent;
  let fixture: ComponentFixture<StudentRozkladComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRozkladComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRozkladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
