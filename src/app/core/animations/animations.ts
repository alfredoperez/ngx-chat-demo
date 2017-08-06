import { style, animate, trigger, transition, state } from '@angular/animations';

export let routeAnimation = trigger('routeAnimation', [
  transition('void => *', [
    style({opacity: 0}),
    animate('0.5s ease-in-out', style({opacity: 1}))
  ]),
  transition('* => void', [
    style({opacity: 1}),
    animate('0.5s ease-in-out', style({opacity: 0}))
  ])
]);
export let slideInAndOut = trigger('sidebarState', [
  state('open', style({
    left: '0px'
  })),
  state('close', style({
    left: '300px'
  })),
  transition('inactive => active', animate('100ms ease-in')),
  transition('active => inactive', animate('100ms ease-out'))
]);

