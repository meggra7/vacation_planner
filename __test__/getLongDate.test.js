import { getLongDate } from '../src/client/js/date-utils.js';

test('Takes 2020-08-22 and returns August 22, 2020', () => {
    expect(getLongDate('2020-08-22')).toBe('August 22, 2020');
});