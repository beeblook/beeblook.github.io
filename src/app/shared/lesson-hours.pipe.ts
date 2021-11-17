import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessonHours',
})
export class LessonHoursPipe implements PipeTransform {
  lessonsTimeTable = `1	09:00	10:35
  2	10:50	12:25
  3	13:05	14:40
  4	14:50	16:25
  5	16:35	18:10
  6	18:20	19:55
  0	07:10	08:50`
    .split(/\r?\n/)
    .map((val) => val.trim().split(/\t/));

  transform(value: any | null | undefined, format?: string): string | null {
    if (value == null) return null;
    if (value > this.lessonsTimeTable.length) return null;
    if (value < 0) return null;
    const lessonIndex = value - 1;
    switch (format) {
      case 'starts':
        return this.lessonsTimeTable[lessonIndex][1];
        break;
      case 'ends':
        return this.lessonsTimeTable[lessonIndex][2];
        break;
      default:
        return [
          this.lessonsTimeTable[lessonIndex][1],
          this.lessonsTimeTable[lessonIndex][2],
        ].join(' ');
    }
  }
}
