import * as moment from 'moment';
type InvalidMoment = 'invalid-year' |
    'invalid-month' |
    'invalid-day' |
    'invalid-hour' |
    'invalid-minute' |
    'invalid-second' |
    'invalid-millisecond';
const validationTypes: { [index: number]: InvalidMoment } = {
    0: 'invalid-year',
    1: 'invalid-month',
    2: 'invalid-day',
    3: 'invalid-hour',
    4: 'invalid-minute',
    5: 'invalid-second',
    6: 'invalid-millisecond'
};
export class DateUtil {
    public static validate(date: any): true | InvalidMoment {
        const m = moment(date);
        if (m.isValid()) {
            return true;
        } else {
            return validationTypes[m.invalidAt()]
        }
    }
    public static dateToIsoString(date: Date|string): string | null {
        return moment(date).toISOString();
    }
}