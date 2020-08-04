// Import functions to be tested, client-side so no server required
import {
    getDateRangeLength,
    getLongDate,
} from '../src/client/js/date-utils.js';

// Client test 1
test('Get date range of 2020-08-22 to 2020-12-14 returns 115 days', () => {
    expect(getDateRangeLength('2020-08-22', '2020-12-14')).toBe(115);
});

// Client test 2
test('Get long date of 2020-08-22 returns August 22, 2020', () => {
    expect(getLongDate('2020-08-22')).toBe('August 22, 2020');
});

// Client test 3
test('Get long date of 2020-08-04 returns August 4, 2020', () => {
    // Removes leading zero
    expect(getLongDate('2020-08-04')).toBe('August 4, 2020');
});