import CalendarLocale from 'rc-calendar/lib/locale/nb_NO';
import TimePickerLocale from '../../time-picker/locale/nb_NO';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Velg dato',
    rangePlaceholder: ['Startdato', 'Sluttdato'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json

export default locale;
