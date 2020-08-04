import { getDateRangeLength } from '../src/client/js/date-utils.js';

test('Date range of 2020-08-22 to 2020-12-14 returns 115 days', () => {
    expect(getDateRangeLength('2020-08-22', '2020-12-14')).toBe(115);
});