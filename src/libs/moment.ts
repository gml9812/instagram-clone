import { MomentInput } from 'moment';
import 'moment/locale/ko';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Seoul');

moment.updateLocale('ko', {
  relativeTime: {
    s: '방금',
    ss: '%d초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '하루',
    dd: '%d일',
    M: '한달',
    MM: '%d개월',
    y: '1년',
    yy: '%d년',
  },
});

export const ago = (time: MomentInput) => {
  if (moment(time).diff(moment.now()) >= 0) {
    return '방금 전';
  }
  return moment(time).fromNow();
};

export default moment;
