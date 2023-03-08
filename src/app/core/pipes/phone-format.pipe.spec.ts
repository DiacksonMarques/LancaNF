import { fakeAsync } from '@angular/core/testing';
import { PhoneFormatPipe } from './phone-format.pipe';

describe('PhoneFormatPipe', () => {
  it('create an instance', fakeAsync(
    () => {
      const pipe = new PhoneFormatPipe();
      expect(pipe).toBeTruthy();
    }
  ));
});
