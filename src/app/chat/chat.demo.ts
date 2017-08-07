import * as moment from 'moment';

let messages = [
  {
    message: 'Hey David! How\'s it going?',
    when: moment().subtract(35, 'minutes'),
    who: 'partner'
  },
  {
    message: 'You wanted to go golfing you remember? What about this weekend?',
    when: moment().subtract(34, 'minutes'),
    who: 'partner'
  },
  {
    message: 'Hey! I\'m good. Sure, let\'s meet on Saturday at the golf club, okay?',
    when: moment().subtract(28, 'minutes'),
    who: 'me'
  },
  {
    message: 'Sure thing! I hope we can finally beat our record this time. :)',
    when: moment().subtract(26, 'minutes'),
    who: 'partner'
  },
  {
    message: 'Awesome! We surely will. ;)',
    when: moment().subtract(22, 'minutes'),
    who: 'me'
  },
  {
    message: 'See you on Saturday!',
    when: moment().subtract(21, 'minutes'),
    who: 'me'
  }
];
