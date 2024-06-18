import { TitleMaxLengthPipe } from './title-max-length.pipe';

describe('TitleMaxLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new TitleMaxLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
