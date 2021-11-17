import { LessonHoursPipe } from './lesson-hours.pipe';

describe('LessonHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new LessonHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
